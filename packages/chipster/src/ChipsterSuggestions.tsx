import React, { useState, useCallback, useEffect } from 'react'
import classNames from 'classnames'
import styles from './chipster.module.css'
import { ChipsterSuggestionsProps } from './types'
import { useChipsterContext } from './ChipsterContext'

export const ChipsterSuggestions = ({
  getSuggestions,
  className,
  style = 'fullWidth',
  children,
  ...props
}: ChipsterSuggestionsProps) => {
  const { 
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
  
  useEffect(() => {
    if (getSuggestions && inputValue) {
      let newSuggestions = getSuggestions(inputValue)
      
      if (!allowDuplicates) {
        newSuggestions = newSuggestions.filter(
          suggestion => !items.some(item => item.text === suggestion)
        )
      }
      setSuggestions(newSuggestions)
    } else {
      setSuggestions([])
    }
  }, [getSuggestions, inputValue, items, allowDuplicates, setSuggestions])

  const handleSelect = useCallback((suggestion: string) => {
    addItem(suggestion)
    setSelectedSuggestionIndex(-1)
  }, [addItem, setSelectedSuggestionIndex])

  if (!showSuggestions || !suggestions.length) return null

  if (children) {
    return (
      <div 
        className={classNames(
          styles.suggestions,
          className,
          {
            [styles.suggestionsFull]: style === 'fullWidth',
            [styles.suggestionsMinimal]: style === 'minimal',
          }
        )}
      >
        {children({ 
          suggestions, 
          onSelect: handleSelect,
          selectedIndex: selectedSuggestionIndex
        })}
      </div>
    )
  }

  return (
    <ul
      role="listbox"
      className={classNames(
        styles.suggestions,
        className,
        {
          [styles.suggestionsFull]: style === 'fullWidth',
          [styles.suggestionsMinimal]: style === 'minimal',
        }
      )}
      {...props}
    >
      {suggestions.map((suggestion, index) => (
        <li
          key={index}
          role="option"
          aria-selected={index === selectedSuggestionIndex}
          className={classNames(
            styles.suggestion,
            { [styles.suggestionSelected]: index === selectedSuggestionIndex }
          )}
          onClick={() => handleSelect(suggestion)}
        >
          {suggestion}
        </li>
      ))}
    </ul>
  )
} 