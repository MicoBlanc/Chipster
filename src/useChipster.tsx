import { useState, useCallback } from 'react';

export interface ChipsterItem {
  id: string;
  text: string;
  icon?: React.ReactNode;
}

export interface ValidationRule {
  test: (value: string) => boolean;
  message?: string;
}

export interface UseChipsterOptions {
  validationRules?: ValidationRule[];
  getIcon?: (value: string) => React.ReactNode;
  maxItems?: number;
  maxItemsMessage?: string;
  allowDuplicates?: boolean;
  caseSensitive?: boolean;
  transform?: (value: string) => string;
  showErrorMessage?: boolean;
}

export function useChipster(options: UseChipsterOptions = {}) {
  const [items, setItems] = useState<ChipsterItem[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [highlightedIndex, setHighlightedIndex] = useState<number | null>(null);

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
  }, [items, options, validateInput]);

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
    validateInput,
  };
}
