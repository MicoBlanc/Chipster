import React, { useCallback, useRef } from 'react'
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
    validationConfig,
    mode,
    joiner = [',', 'Enter'],
  } = useChipsterContext()

  const inputRef = useRef<HTMLInputElement>(null)
  const joiners = Array.isArray(joiner) ? joiner : [joiner]

  // Input validation
  const validateInput = useCallback((value: string) => {
    if (!validationConfig?.validationRules) return true
    
    for (const rule of validationConfig.validationRules) {
      if (!rule.test(value)) {
        setError(rule.message || 'Invalid input')
        return false
      }
    }
    setError(null)
    return true
  }, [validationConfig, setError])

  // Handle item addition
  const handleAddItem = useCallback((value: string, suggestion?: any) => {
    if (addItem(value.trim(), suggestion)) {
      setInputValue('')
      onInputChange?.('')
      setSelectedSuggestionIndex(-1)
      return true
    }
    return false
  }, [addItem, setInputValue, onInputChange, setSelectedSuggestionIndex])

  // Handle input changes
  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value
    const lastChar = newValue.slice(-1)
    
    if (joiners.includes(lastChar) && newValue.trim().length > 1) {
      const valueToAdd = newValue.slice(0, -1).trim()
      if (valueToAdd && handleAddItem(valueToAdd)) {
        return
      }
    }

    setInputValue(newValue)
    onInputChange?.(newValue)
    
    if (newValue.trim().length > 0) {
      validateInput(newValue)
      updateSuggestions(newValue)
      setShowSuggestions(true)
    } else {
      setError(null)
      setShowSuggestions(false)
    }
  }, [joiners, handleAddItem, updateSuggestions, setShowSuggestions, onInputChange, setInputValue, setError, validateInput])

  // Handle keyboard navigation
  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (disabled) return

    const currentValue = inputValue || ''

    // Handle item addition
    if (joiners.includes(e.key) && currentValue.trim()) {
      e.preventDefault()
          
      if (selectedSuggestionIndex >= 0 && suggestions.length > 0) {
        const selectedSuggestion = suggestions[selectedSuggestionIndex]
        const value = typeof selectedSuggestion === 'string' 
          ? selectedSuggestion 
          : selectedSuggestion.label
        handleAddItem(value, selectedSuggestion)
        return
      }

      if (mode === 'free') {
        handleAddItem(currentValue)
      }
      return
    }

    // Only handle navigation when input is empty
    if (currentValue === '') {
      switch (e.key) {
        case 'ArrowLeft':
          e.preventDefault()
          if (highlightedIndex === null && items.length > 0) {
            highlightItem(items.length - 1)
          } else if (highlightedIndex !== null && highlightedIndex > 0) {
            highlightItem(highlightedIndex - 1)
          }
          break

        case 'ArrowRight':
          e.preventDefault()
          if (highlightedIndex !== null) {
            if (highlightedIndex < items.length - 1) {
              highlightItem(highlightedIndex + 1)
            } else {
              highlightItem(null)
              inputRef.current?.focus()
            }
          }
          break

        case 'Backspace':
          e.preventDefault()
          if (highlightedIndex !== null) {
            removeItem(items[highlightedIndex].id)
            highlightItem(null)
          } else if (items.length > 0) {
            highlightItem(items.length - 1)
          }
          break
      }
      return
    }

    // Handle suggestions navigation
    switch (e.key) {
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
      case 'Escape':
        setSelectedSuggestionIndex(-1)
        setShowSuggestions(false)
        highlightItem(null)
        break
    }
  }, [mode, disabled, inputValue, suggestions, selectedSuggestionIndex, items, highlightedIndex, handleAddItem])

  return (
    <input
      ref={inputRef}
      type="text"
      value={inputValue || ''}
      onChange={handleInputChange}
      onKeyDown={handleKeyDown}
      onFocus={() => setShowSuggestions(true)}
      onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
      placeholder={typeof placeholder === 'string' ? placeholder : ''}
      className={classNames(
        styles.input,
        theme === 'dark' ? styles.inputDark : '',
        className
      )}
      disabled={disabled}
      {...props}
    />
  )
} 