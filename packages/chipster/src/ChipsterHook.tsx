'use client'
import { useState, useCallback } from 'react'
import { ChipsterItem, ChipsterProps, ChipsterContextType, ChipsterSuggestion } from './types'

const isObjectSuggestion = (suggestion: ChipsterSuggestion): suggestion is { 
  label: string
  icon?: React.ReactNode
  data?: any 
} => {
  return typeof suggestion === 'object' && 'label' in suggestion
}

export function useChipster(props: ChipsterProps = {}): ChipsterContextType {
  const {
    mode = 'free',
    defaultValue,
    onAdd,
    onRemove,
    disabled,
    theme = 'light',
  } = props

  const [items, setItems] = useState<ChipsterItem[]>(() => 
    defaultValue 
      ? defaultValue.map(text => ({
          id: Date.now().toString() + Math.random(),
          text
        }))
      : []
  )
  const [error, setError] = useState<string | null>(null)
  const [highlightedIndex, setHighlightedIndex] = useState<number | null>(null)
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [inputValue, setInputValue] = useState('')
  const [suggestions, setSuggestions] = useState<ChipsterSuggestion[]>([])
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

  const addItem = useCallback((text: string, suggestion?: ChipsterSuggestion) => {
    if (mode === 'suggestions-only' && !suggestion) {
      return false
    }

    if (validateInput(text)) {
      const processedValue = validationConfig?.transform ? 
        validationConfig.transform(text) : text.trim()
      
      let icon: React.ReactNode | undefined
      let data: any | undefined

      if (suggestion && isObjectSuggestion(suggestion)) {
        icon = suggestion.icon
        data = suggestion.data
      }
      
      const newItem = { 
        id: Date.now().toString(), 
        text: processedValue, 
        icon,
        data
      }
      
      setItems(prev => [...prev, newItem])
      onAdd?.(processedValue)
      return true
    }
    return false
  }, [mode, validateInput, validationConfig, onAdd])

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
    mode,
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