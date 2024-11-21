import React, { useCallback, useEffect, useRef } from 'react'
import classNames from 'classnames'
import styles from './chipster.module.css'
import { ChipsterSuggestionsProps, ChipsterSuggestion } from './types'
import { useChipsterContext } from './ChipsterContext'

export const ChipsterSuggestions = ({
  getSuggestions,
  className,
  children,
  onSelect,
  ...props
}: ChipsterSuggestionsProps): JSX.Element | null => {
  const { 
    theme,
    items,
    addItem,
    showSuggestions,
    inputValue,
    setInputValue,
    allowDuplicates,
    selectedSuggestionIndex,
    setSelectedSuggestionIndex,
    suggestions,
    setSuggestions
  } = useChipsterContext()
  
  const listRef = useRef<HTMLUListElement>(null)
  const itemRefs = useRef<(HTMLLIElement | null)[]>([])

  const getSuggestionLabel = useCallback((suggestion: ChipsterSuggestion): string => {
    return typeof suggestion === 'string' ? suggestion : suggestion.label
  }, [])

  useEffect(() => {
    if (getSuggestions && inputValue) {
      let newSuggestions = getSuggestions(inputValue)
      
      if (!allowDuplicates) {
        newSuggestions = newSuggestions.filter(
          suggestion => !items.some(item => 
            item.text === getSuggestionLabel(suggestion)
          )
        )
      }
      setSuggestions(newSuggestions)
    } else {
      setSuggestions([])
    }
  }, [getSuggestions, inputValue, items, allowDuplicates, setSuggestions, getSuggestionLabel])

  // Auto-scroll effect
  useEffect(() => {
    if (selectedSuggestionIndex >= 0 && showSuggestions) {
      const selectedItem = itemRefs.current[selectedSuggestionIndex]
      if (selectedItem && listRef.current) {
        const container = listRef.current
        const itemTop = selectedItem.offsetTop
        const itemBottom = itemTop + selectedItem.offsetHeight
        const containerTop = container.scrollTop
        const containerBottom = containerTop + container.offsetHeight

        if (itemTop < containerTop) {
          container.scrollTop = itemTop
        } else if (itemBottom > containerBottom) {
          container.scrollTop = itemBottom - container.offsetHeight
        }
      }
    }
  }, [selectedSuggestionIndex, showSuggestions])

  const handleSelect = useCallback((suggestion: ChipsterSuggestion) => {
    const label = getSuggestionLabel(suggestion)
    addItem(label, suggestion)
    setSelectedSuggestionIndex(-1)
    setInputValue('')
  }, [addItem, setSelectedSuggestionIndex, setInputValue, getSuggestionLabel])

  if (!showSuggestions || !suggestions.length) return null

  if (children) {
    return children({ 
      suggestions, 
      onSelect: handleSelect,
      selectedIndex: selectedSuggestionIndex
    }) as JSX.Element | null
  }

  const listProps = {
    ref: listRef,
    role: 'listbox',
    className: classNames(
      styles.suggestions,
      theme === 'dark' ? styles.suggestionsDark : '',
      className
    ),
    ...props
  }

  return (
    <ul {...listProps}>
      {suggestions.map((suggestion, index) => (
        <li
          key={index}
          ref={el => itemRefs.current[index] = el}
          role="option"
          aria-selected={index === selectedSuggestionIndex}
          className={classNames(
            styles.suggestion,
            theme === 'dark' ? styles.suggestionDark : '',
            { 
              [styles.suggestionSelected]: index === selectedSuggestionIndex && theme === 'light',
              [styles.suggestionSelectedDark]: index === selectedSuggestionIndex && theme === 'dark'
            }
          )}
          onClick={() => handleSelect(suggestion)}
        >
          {typeof suggestion === 'string' ? (
            suggestion
          ) : (
            <div className={styles.suggestionWithIcon}>
              {suggestion.icon && (
                <span className={classNames(
                  styles.suggestionIcon,
                  theme === 'dark' ? styles.suggestionIconDark : ''
                )}>
                  {suggestion.icon}
                </span>
              )}
              <span>{suggestion.label}</span>
            </div>
          )}
        </li>
      ))}
    </ul>
  )
} 