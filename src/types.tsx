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
}

export interface ChipsterProps {
  onAdd?: (value: string) => void;
  onRemove?: (id: string) => void;
  placeholder?: string | ReactNode;
  className?: string;
  inputClassName?: string;
  errorClassName?: string;
  disabled?: boolean;
  validationRules?: ValidationRule[];
  getIcon?: (value: string) => ReactNode;
  maxItems?: number;
  maxItemsMessage?: string;
  allowDuplicates?: boolean;
  caseSensitive?: boolean;
  renderItem?: (item: ChipsterItem, index: number, highlighted: boolean) => ReactNode;
  transform?: (value: string) => string;
  showErrorMessage?: boolean;
  exitAnimation?: ChipsterAnimationConfig | AnimationPreset;
}

export interface ItemProps {
  children: ReactNode;
  onRemove?: () => void;
  className?: string;
  removeButtonClassName?: string;
  highlighted?: boolean;
  disabled?: boolean;
  icon?: ReactNode;
  tabIndex?: number;
  role?: string;
  'aria-selected'?: boolean;
  'data-chip-index'?: number;
}

