import React, { useState, useCallback, useRef, KeyboardEvent } from 'react'
import classNames from 'classnames'
import styles from './chipster.module.css'
import { ChipsterInputProps } from './types'
import { useChipsterContext } from './ChipsterContext'

export const ChipsterInput = ({ 
  className,
  placeholder = 'Type and press Enter',
  onInputChange,
  ...props 
}: ChipsterInputProps) => {
  const { 
    disabled,
    theme,
    addItem,
    items,
    highlightedIndex,
    highlightItem,
    removeItem,
    updateSuggestions,
    setShowSuggestions,
    inputValue,
    setInputValue,
    setSelectedSuggestionIndex,
    selectedSuggestionIndex,
    suggestions,
    setError,
  } = useChipsterContext()

  const inputRef = useRef<HTMLInputElement>(null)

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value
    setInputValue(newValue)
    onInputChange?.(newValue)
    
    if (newValue.trim().length > 0) {
      updateSuggestions(newValue)
      setShowSuggestions(true)
    } else {
      setError(null)
      setShowSuggestions(false)
    }
  }, [updateSuggestions, setShowSuggestions, onInputChange, setInputValue, setError])

  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (disabled) return

    switch (e.key) {
      // Suggestions navigation
      case 'ArrowDown':
        if (suggestions.length > 0) {
          e.preventDefault()
          setSelectedSuggestionIndex(prev => 
            prev < suggestions.length - 1 ? prev + 1 : prev
          )
        }
        break
      case 'ArrowUp':
        if (suggestions.length > 0) {
          e.preventDefault()
          setSelectedSuggestionIndex(prev => 
            prev > 0 ? prev - 1 : 0
          )
        }
        break

      // Item deletion and navigation
      case 'Backspace':
        if (inputValue === '') {
          e.preventDefault()
          if (highlightedIndex !== null) {
            const itemToRemove = items[highlightedIndex]
            removeItem(itemToRemove.id)
            highlightItem(null)
          } else if (items.length > 0) {
            highlightItem(items.length - 1)
          }
        }
        break

      case 'ArrowLeft':
        if (inputValue === '') {
          e.preventDefault()
          if (highlightedIndex === null && items.length > 0) {
            highlightItem(items.length - 1)
          } else if (highlightedIndex !== null && highlightedIndex > 0) {
            highlightItem(highlightedIndex - 1)
          }
        }
        break

      case 'ArrowRight':
        if (inputValue === '') {
          e.preventDefault()
          if (highlightedIndex !== null) {
            if (highlightedIndex < items.length - 1) {
              highlightItem(highlightedIndex + 1)
            } else {
              highlightItem(null)
              inputRef.current?.focus()
            }
          }
        }
        break

      // Suggestion selection
      case 'Enter':
        if (suggestions.length > 0 && selectedSuggestionIndex >= 0) {
          e.preventDefault()
          const selectedSuggestion = suggestions[selectedSuggestionIndex]
          const value = typeof selectedSuggestion === 'string' 
            ? selectedSuggestion 
            : selectedSuggestion.label
          addItem(value)
          setSelectedSuggestionIndex(-1)
          setInputValue('')
        }
        break

      case 'Escape':
        setSelectedSuggestionIndex(-1)
        setShowSuggestions(false)
        highlightItem(null)
        break
    }
  }, [
    disabled,
    suggestions,
    selectedSuggestionIndex,
    setSelectedSuggestionIndex,
    addItem,
    setShowSuggestions,
    setInputValue,
    inputValue,
    items,
    highlightedIndex,
    highlightItem,
    removeItem
  ])

  const handleFocus = useCallback(() => {
    setShowSuggestions(true)
    
    // positioning logic for minimal style
    if (inputRef.current) {
      const rect = inputRef.current.getBoundingClientRect()
      const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop
      
      document.documentElement.style.setProperty('--suggestions-top', `${rect.bottom + scrollTop}px`)
      document.documentElement.style.setProperty('--suggestions-left', `${rect.left + scrollLeft}px`)
      document.documentElement.style.setProperty('--suggestions-width', `${rect.width}px`)
    }
  }, [setShowSuggestions])

  const handleBlur = useCallback(() => {
    setTimeout(() => {
      setShowSuggestions(false)
      // Clean up CSS variables
      document.documentElement.style.removeProperty('--suggestions-top')
      document.documentElement.style.removeProperty('--suggestions-left')
      document.documentElement.style.removeProperty('--suggestions-width')
    }, 200)
  }, [setShowSuggestions])

  return (
    <input
      ref={inputRef}
      type="text"
      value={inputValue}
      onChange={handleInputChange}
      onKeyDown={handleKeyDown}
      onFocus={handleFocus}
      onBlur={handleBlur}
      placeholder={typeof placeholder === 'string' ? placeholder : ''}
      className={classNames(styles.input, className, {
        [styles.inputDark]: theme === 'dark'
      })}
      disabled={disabled}
      {...props}
    />
  )
} 