import { ReactNode } from 'react';

export interface ChipsterItem {
  id: string;
  text: string;
  icon?: ReactNode;
}

export interface ValidationRule {
  test: (value: string) => boolean;
  message?: string;
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
  addItem: (text: string) => boolean
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
  suggestions: string[]
  setSuggestions: (suggestions: string[]) => void
}

export interface ChipsterProps extends Omit<UseChipsterOptions, 'onItemsChange' | 'validationRules' | 'maxItems' | 'allowDuplicates' | 'transform'> {
  children?: React.ReactNode
  theme?: 'light' | 'dark'
  disabled?: boolean
  className?: string
  onAdd?: (value: string) => void
  onRemove?: (id: string) => void
}

export interface ChipsterInputProps {
  placeholder?: string | React.ReactNode
  className?: string
  inputValue?: string
  setInputValue?: (value: string) => void
  onInputChange?: (value: string) => void
}

export interface ChipsterSuggestionsProps {
  getSuggestions?: (input: string) => string[]
  onSelect?: (suggestion: string) => void
  className?: string
  style?: 'fullWidth' | 'minimal'
  children?: (props: {
    suggestions: string[]
    onSelect: (suggestion: string) => void
    selectedIndex?: number
  }) => React.ReactNode
}

export interface ChipsterItemProps {
  item: ChipsterItem
  className?: string
  highlightedClassName?: string
  disabledClassName?: string
  iconClassName?: string
  removeButtonClassName?: string
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
}
