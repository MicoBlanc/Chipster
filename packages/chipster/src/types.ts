import { ReactNode } from 'react';

export interface ChipsterItem {
  id: string;
  text: string;
  icon?: ReactNode;
}

export interface ValidationRule {
  test: (value: string) => boolean;
  message: string;
}

export interface UseChipsterOptions {
  validationRules?: ValidationRule[];
  onItemsChange?: (items: ChipsterItem[]) => void;
  getIcon?: (value: string) => ReactNode;
  defaultValue?: string[];
  maxItems?: number;
  maxItemsMessage?: string;
  allowDuplicates?: boolean;
  caseSensitive?: boolean;
  transform?: (value: string) => string;
  showErrorMessage?: boolean;
  getSuggestions?: (input: string) => string[];
}

export interface ItemProps {
  children: ReactNode;
  onRemove?: () => void;
  className?: string;
  highlightedClassName?: string;
  disabledClassName?: string;
  iconClassName?: string;
  removeButtonClassName?: string;
  highlighted?: boolean;
  disabled?: boolean;
  icon?: ReactNode;
  tabIndex?: number;
  role?: string;
  'aria-selected'?: boolean;
  'data-chip-index'?: number;
}

export interface ChipsterContextType {
  items: ChipsterItem[]
  addItem: (text: string, suggestion?: ChipsterSuggestion) => boolean
  removeItem: (id: string) => void
  inputValue?: string
  setInputValue: (value: string) => void
  error: string | null
  setError: (error: string | null) => void
  validationConfig: {
    validationRules?: ValidationRule[]
    maxItems?: number
    maxItemsMessage?: string
    allowDuplicates?: boolean
    transform?: (value: string) => string
    onError?: (error: string) => void
  } | null
  setValidationConfig: (config: ChipsterContextType['validationConfig']) => void
  highlightedIndex: number | null
  highlightItem: (index: number | null) => void  
  disabled?: boolean
  theme?: 'light' | 'dark'
  allowDuplicates?: boolean
  updateSuggestions: (input: string) => void
  clearSuggestions: () => void
  showSuggestions: boolean
  setShowSuggestions: (show: boolean) => void
  selectedSuggestionIndex: number
  setSelectedSuggestionIndex: (index: number | ((prev: number) => number)) => void
  suggestions: ChipsterSuggestion[]
  setSuggestions: (suggestions: ChipsterSuggestion[]) => void
  mode: 'free' | 'suggestions-only';
  containerRef: React.RefObject<HTMLDivElement>;
  inputRef: React.RefObject<HTMLInputElement>;
  focusedItemIndex: number | null;
  setFocusedItemIndex: (index: number | null) => void;
}

export interface ChipsterProps extends Omit<UseChipsterOptions, 'onItemsChange' | 'validationRules' | 'maxItems' | 'allowDuplicates' | 'transform'> {
  children?: React.ReactNode
  theme?: 'light' | 'dark'
  disabled?: boolean
  className?: string
  onAdd?: (value: string) => void
  onRemove?: (id: string) => void
  mode?: 'free' | 'suggestions-only'
}

export interface ChipsterInputProps {
  placeholder?: string | React.ReactNode
  className?: string
  inputValue?: string
  setInputValue?: (value: string) => void
  onInputChange?: (value: string) => void
}

export type ChipsterSuggestion = string | {
  label: string
  icon?: React.ReactNode
  data?: any
}

export interface ChipsterSuggestionsProps {
  getSuggestions: (input: string) => ChipsterSuggestion[]
  className?: string
  children?: (props: {
    suggestions: ChipsterSuggestion[]
    onSelect: (suggestion: ChipsterSuggestion) => void
    selectedIndex: number
  }) => React.ReactNode
  onSelect?: (suggestion: ChipsterSuggestion) => void
}

export interface ChipsterItemProps {
  item: ChipsterItem
  className?: string
  itemClassName?: string
  highlightedClassName?: string
  disabledClassName?: string
  iconClassName?: string
  removeButtonClassName?: string
  removeIcon?: React.ReactNode
  render?: (item: ChipsterItem, highlighted: boolean) => React.ReactNode
}

export interface ChipsterValidationProps {
  validationRules?: ValidationRule[]
  maxItems?: number
  maxItemsMessage?: string
  allowDuplicates?: boolean
  transform?: (value: string) => string
  className?: string
  errorClassName?: string
  children?: (error: string | null) => React.ReactNode
  onError?: (error: string) => void
}

export interface ChipsterItemListProps {
  className?: string
  itemClassName?: string
  removeButtonClassName?: string
  removeIcon?: React.ReactNode
  iconClassName?: string
}
