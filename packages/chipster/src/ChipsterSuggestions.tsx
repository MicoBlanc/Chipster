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
}: ChipsterSuggestionsProps) => {
  const { 
    theme,
    items,
    addItem,
    showSuggestions,
    inputValue,
    allowDuplicates,
    selectedSuggestionIndex,
    setSelectedSuggestionIndex,
    suggestions,
    setSuggestions
  } = useChipsterContext()
  
  const listRef = useRef<HTMLUListElement>(null)

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

  const handleSelect = useCallback((suggestion: ChipsterSuggestion) => {
    const label = getSuggestionLabel(suggestion)
    addItem(label, suggestion)
    setSelectedSuggestionIndex(-1)
  }, [addItem, setSelectedSuggestionIndex, getSuggestionLabel])

  if (!showSuggestions || !suggestions.length) return null

  if (children) {
    return children({ 
      suggestions, 
      onSelect: handleSelect,
      selectedIndex: selectedSuggestionIndex
    })
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