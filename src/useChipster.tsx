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
  allowDuplicates?: boolean;
  caseSensitive?: boolean;
  transform?: (value: string) => string;
  showErrorMessage?: boolean;
}

export function useChipster(options: UseChipsterOptions = {}) {
  const [items, setItems] = useState<ChipsterItem[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [highlightedIndex, setHighlightedIndex] = useState<number | null>(null);

  const addItem = useCallback((text: string) => {
    let processedText = options.transform ? options.transform(text) : text.trim();
    
    if (options.maxItems && items.length >= options.maxItems) {
      setError(`Maximum of ${options.maxItems} items allowed`);
      return false;
    }

    if (!options.allowDuplicates) {
      const isDuplicate = items.some(item => 
        options.caseSensitive 
          ? item.text === processedText 
          : item.text.toLowerCase() === processedText.toLowerCase()
      );
      if (isDuplicate) {
        setError('Duplicate items are not allowed');
        return false;
      }
    }

    if (options.validationRules) {
      for (const rule of options.validationRules) {
        if (!rule.test(processedText)) {
          setError(options.showErrorMessage ? (rule.message || 'Invalid input') : '');
          return false;
        }
      }
    }

    const icon = options.getIcon ? options.getIcon(processedText) : undefined;
    setItems(prev => [...prev, { id: Date.now().toString(), text: processedText, icon }]);
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
