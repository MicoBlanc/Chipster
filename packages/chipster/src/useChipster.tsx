import { useState, useCallback, useRef, useEffect } from 'react';
import { ChipsterItem, UseChipsterOptions } from './types';

export function useChipster(options: UseChipsterOptions = {}) {
  const [items, setItems] = useState<ChipsterItem[]>(() => 
    options.defaultValue 
      ? options.defaultValue.map(text => ({
          id: Date.now().toString() + Math.random(),
          text,
          icon: options.getIcon ? options.getIcon(text) : undefined
        }))
      : []
  );
  const [error, setError] = useState<string | null>(null);
  const [highlightedIndex, setHighlightedIndex] = useState<number | null>(null);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const suggestionsRef = useRef<HTMLUListElement>(null);

  const validateInput = useCallback((value: string) => {
    let processedValue = options.transform ? options.transform(value) : value.trim();

    if (options.maxItems && items.length >= options.maxItems) {
      setError(options.maxItemsMessage || `Maximum of ${options.maxItems} items allowed`);
      return false;
    }

    if (!options.allowDuplicates) {
      const isDuplicate = items.some(item => 
        options.caseSensitive 
          ? item.text === processedValue 
          : item.text.toLowerCase() === processedValue.toLowerCase()
      );
      if (isDuplicate) {
        setError('Duplicate items are not allowed');
        return false;
      }
    }

    if (options.validationRules) {
      for (const rule of options.validationRules) {
        if (!rule.test(processedValue)) {
          setError(options.showErrorMessage ? (rule.message || 'Invalid input') : '');
          return false;
        }
      }
    }

    setError(null);
    return true;
  }, [items, options]);

  const addItem = useCallback((text: string) => {
    if (validateInput(text)) {
      const processedText = options.transform ? options.transform(text) : text.trim();
      const icon = options.getIcon ? options.getIcon(processedText) : undefined;
      setItems(prev => [...prev, { id: Date.now().toString(), text: processedText, icon }]);
      return true;
    }
    return false;
  }, [options, validateInput]);

  const removeItem = useCallback((id: string) => {
    setItems(prev => prev.filter(item => item.id !== id));
    setHighlightedIndex(null);
  }, []);

  const highlightItem = useCallback((index: number | null) => {
    setHighlightedIndex(index);
  }, []);

  const clearValidation = useCallback(() => {
    setError(null);
  }, []);

  const updateSuggestions = useCallback((input: string) => {
    if (options.getSuggestions) {
      const newSuggestions = options.getSuggestions(input);
      setSuggestions(newSuggestions);
      setShowSuggestions(newSuggestions.length > 0);
    }
  }, [options]);

  const clearSuggestions = useCallback(() => {
    setSuggestions([]);
    setShowSuggestions(false);
  }, []);

  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (suggestionsRef.current && !suggestionsRef.current.contains(event.target as Node)) {
      setShowSuggestions(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [handleClickOutside]);

  return {
    items,
    error,
    highlightedIndex,
    suggestions,
    showSuggestions,
    suggestionsRef,
    addItem,
    removeItem,
    highlightItem,
    validateInput,
    clearValidation,
    updateSuggestions,
    clearSuggestions,
    setShowSuggestions,
  };
}
