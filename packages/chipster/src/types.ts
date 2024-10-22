import { ReactNode } from 'react';
import { ChipsterAnimationConfig, AnimationPreset } from './animations';

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
  getIcon?: (value: string) => ReactNode;
  maxItems?: number;
  maxItemsMessage?: string;
  allowDuplicates?: boolean;
  caseSensitive?: boolean;
  transform?: (value: string) => string;
  showErrorMessage?: boolean;
  getSuggestions?: (input: string) => string[];
}

export interface ChipsterProps extends UseChipsterOptions {
  onAdd?: (value: string) => void;
  onRemove?: (id: string) => void;
  onItemsChange?: (items: ChipsterItem[]) => void;
  placeholder?: string | React.ReactNode;
  className?: string;
  inputClassName?: string;
  errorClassName?: string;
  chipClassName?: string;
  chipHighlightedClassName?: string;
  chipDisabledClassName?: string;
  chipIconClassName?: string;
  chipRemoveButtonClassName?: string;
  suggestionStyle?: 'fullWidth' | 'minimal';
  disabled?: boolean;
  renderItem?: (item: ChipsterItem, index: number, highlighted: boolean) => React.ReactNode;
  exitAnimation?: ChipsterAnimationConfig | AnimationPreset;
  onInputChange?: (value: string) => void;
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

export interface UseChipsterReturn {
  showSuggestions: boolean;
  suggestionsRef: React.RefObject<HTMLUListElement>;
  setShowSuggestions: React.Dispatch<React.SetStateAction<boolean>>;
}
