'use client'
import { useState, useCallback, useEffect } from 'react'
import { ChipsterItem, ChipsterProps, ChipsterContextType } from './types'

export function useChipster(props: ChipsterProps = {}): ChipsterContextType {
  const {
    defaultValue,
    getIcon,
    onAdd,
    onRemove,
    disabled,
    theme = 'light',
  } = props

  const [items, setItems] = useState<ChipsterItem[]>(() => 
    defaultValue 
      ? defaultValue.map(text => ({
          id: Date.now().toString() + Math.random(),
          text,
          icon: getIcon ? getIcon(text) : undefined
        }))
      : []
  )
  const [error, setError] = useState<string | null>(null)
  const [highlightedIndex, setHighlightedIndex] = useState<number | null>(null)
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [inputValue, setInputValue] = useState('')
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState(-1)
  const [validationConfig, setValidationConfig] = useState<ChipsterContextType['validationConfig']>(null)

  const validateInput = useCallback((value: string) => {
    if (!validationConfig) return true

    const {
      validationRules,
      maxItems,
      maxItemsMessage,
      allowDuplicates,
      transform
    } = validationConfig

    let processedValue = transform ? transform(value) : value.trim()

    if (maxItems && items.length >= maxItems) {
      setError(maxItemsMessage || `Maximum of ${maxItems} items allowed`)
      return false
    }

    if (!allowDuplicates) {
      const isDuplicate = items.some(item => 
        item.text.toLowerCase() === processedValue.toLowerCase()
      )
      if (isDuplicate) {
        setError('Duplicate items are not allowed')
        return false
      }
    }

    if (validationRules) {
      for (const rule of validationRules) {
        if (!rule.test(processedValue)) {
          setError(rule.message || 'Invalid input')
          return false
        }
      }
    }
    
    setError(null)
    return true
  }, [items, validationConfig])

  const addItem = useCallback((text: string) => {
    if (validateInput(text)) {
      const processedValue = validationConfig?.transform ? 
        validationConfig.transform(text) : text.trim()
      const icon = getIcon ? getIcon(processedValue) : undefined
      const newItem = { id: Date.now().toString(), text: processedValue, icon }
      
      setItems(prev => [...prev, newItem])
      onAdd?.(processedValue)
      return true
    }
    return false
  }, [validateInput, validationConfig, getIcon, onAdd])

  const removeItem = useCallback((id: string) => {
    setItems(prev => {
      const newItems = prev.filter(item => item.id !== id)
      const removedItem = prev.find(item => item.id === id)
      if (removedItem) {
        onRemove?.(removedItem.id)
      }
      return newItems
    })
    setHighlightedIndex(null)
  }, [onRemove])

  const highlightItem = useCallback((index: number | null) => {
    setHighlightedIndex(index)
  }, [])

  const clearValidation = useCallback(() => {
    setError(null)
  }, [])

  const updateSuggestions = useCallback((input: string) => {
    if (props.getSuggestions) {
      const newSuggestions = props.getSuggestions(input)
      setSuggestions(newSuggestions)
    }
  }, [props.getSuggestions])

  const clearSuggestions = useCallback(() => {
    setShowSuggestions(false)
  }, [])

  return {
    items,
    error,
    setError,
    highlightedIndex,
    showSuggestions,
    disabled,
    theme,
    allowDuplicates: validationConfig?.allowDuplicates,
    addItem,
    removeItem,
    highlightItem,
    updateSuggestions,
    clearSuggestions,
    setShowSuggestions,
    inputValue,
    setInputValue,
    suggestions,
    setSuggestions,
    selectedSuggestionIndex,
    setSelectedSuggestionIndex,
    validationConfig,
    setValidationConfig
  }
}