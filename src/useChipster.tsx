import { useState, useCallback } from 'react';

export interface ChipsterItem {
  id: string;
  text: string;
  icon?: React.ReactNode;
}

export interface ValidationResult {
  isValid: boolean;
  errorMessage?: string;
}

export interface UseChipsterOptions {
  validate?: (value: string) => ValidationResult;
  getIcon?: (value: string) => React.ReactNode;
  maxItems?: number;
  allowDuplicates?: boolean;
  caseSensitive?: boolean;
}

export function useChipster(options: UseChipsterOptions = {}) {
  const [items, setItems] = useState<ChipsterItem[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [highlightedIndex, setHighlightedIndex] = useState<number | null>(null);

  const addItem = useCallback((text: string) => {
    const trimmedText = text.trim();
    
    if (options.maxItems && items.length >= options.maxItems) {
      setError(`Maximum of ${options.maxItems} items allowed`);
      return false;
    }

    if (!options.allowDuplicates) {
      const isDuplicate = items.some(item => 
        options.caseSensitive 
          ? item.text === trimmedText 
          : item.text.toLowerCase() === trimmedText.toLowerCase()
      );
      if (isDuplicate) {
        setError('Duplicate items are not allowed');
        return false;
      }
    }

    if (options.validate) {
      const validationResult = options.validate(trimmedText);
      if (!validationResult.isValid) {
        setError(validationResult.errorMessage || 'Invalid input');
        return false;
      }
    }

    const icon = options.getIcon ? options.getIcon(trimmedText) : undefined;
    setItems(prev => [...prev, { id: Date.now().toString(), text: trimmedText, icon }]);
    setError(null);
    return true;
  }, [items, options]);

  const removeItem = useCallback((id: string) => {
    setItems(prev => prev.filter(item => item.id !== id));
    setHighlightedIndex(null);
  }, []);

  const highlightItem = useCallback((index: number | null) => {
    setHighlightedIndex(index);
  }, []);

  return {
    items,
    error,
    highlightedIndex,
    addItem,
    removeItem,
    highlightItem,
  };
}
