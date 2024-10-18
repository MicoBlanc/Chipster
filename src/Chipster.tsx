import React, { useRef, ReactNode, useState, useCallback } from 'react';
import classNames from 'classnames';
import { useChipster, ChipsterItem, ValidationRule } from './useChipster';
import { ChipsterAnimationConfig, defaultAnimationConfig, getAnimationStyle, AnimationPreset, animations } from './animations';

interface ChipsterProps {
  onAdd?: (value: string) => void;
  onRemove?: (id: string) => void;
  placeholder?: string | ReactNode;
  className?: string;
  inputClassName?: string;
  errorClassName?: string;
  disabled?: boolean;
  validationRules?: ValidationRule[];
  getIcon?: (value: string) => React.ReactNode;
  maxItems?: number;
  maxItemsMessage?: string;
  allowDuplicates?: boolean;
  caseSensitive?: boolean;
  renderItem?: (item: ChipsterItem, index: number, highlighted: boolean) => ReactNode;
  transform?: (value: string) => string;
  showErrorMessage?: boolean;
  animationConfig?: ChipsterAnimationConfig | AnimationPreset | false;
}

export const Chipster: React.FC<ChipsterProps> = ({
  onAdd,
  onRemove,
  placeholder = 'Type and press Enter',
  className,
  inputClassName,
  errorClassName,
  disabled = false,
  validationRules,
  getIcon,
  maxItems,
  maxItemsMessage,
  allowDuplicates = false,
  caseSensitive = true,
  renderItem,
  transform,
  showErrorMessage = true,
  animationConfig = defaultAnimationConfig,
}) => {
  const [inputValue, setInputValue] = useState('');
  const { 
    items, 
    error, 
    highlightedIndex, 
    addItem, 
    removeItem, 
    highlightItem,
    validateInput 
  } = useChipster({ 
    validationRules, 
    getIcon, 
    maxItems, 
    maxItemsMessage,
    allowDuplicates, 
    caseSensitive,
    transform,
    showErrorMessage,
  });
  const inputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    validateInput(newValue);
  }, [validateInput]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (disabled) return;

    if (e.key === 'Enter' && inputRef.current) {
      e.preventDefault();
      const success = handleAddItem(inputValue);
      if (success) {
        onAdd?.(inputValue);
        setInputValue('');
      }
    } else if (e.key === 'Backspace' && inputValue === '') {
      e.preventDefault();
      if (highlightedIndex !== null) {
        const itemToRemove = items[highlightedIndex];
        handleRemoveItem(itemToRemove.id, highlightedIndex);
      } else if (items.length > 0) {
        highlightItem(items.length - 1);
      }
    }
  };

  const actualAnimationConfig = typeof animationConfig === 'string' 
    ? animations[animationConfig] 
    : animationConfig;

  const handleAddItem = useCallback((text: string) => {
    const newItemId = addItem(text);
    return !!newItemId;
  }, [addItem]);

  const handleRemoveItem = useCallback((id: string, index: number) => {
    if (actualAnimationConfig) {
      const chipElement = document.getElementById(`chip-${id}`);
      if (chipElement) {
        Object.assign(chipElement.style, getAnimationStyle(actualAnimationConfig.exit, true));
        setTimeout(() => {
          removeItem(id);
          onRemove?.(id);
        }, actualAnimationConfig.exit.duration);
      } else {
        removeItem(id);
        onRemove?.(id);
      }
    } else {
      removeItem(id);
      onRemove?.(id);
    }
  }, [removeItem, onRemove, actualAnimationConfig]);

  return (
    <div>
      <div 
        className={classNames(
          'flex flex-wrap items-center p-0.5 border bg-white border-gray-300 rounded-lg',
          'focus-within:ring-2 focus-within:ring-black focus-within:ring-offset-2',
          { 'opacity-50 cursor-not-allowed': disabled },
          { 'border-red-500 border-2': error },
          className
        )}
        onClick={() => !disabled && inputRef.current?.focus()}
      >
        {items.map((item, index) => (
          <div key={item.id} id={`chip-${item.id}`}>
            {renderItem ? (
              renderItem(item, index, index === highlightedIndex)
            ) : (
              <Item
                highlighted={index === highlightedIndex}
                disabled={disabled}
                icon={item.icon}
                onRemove={() => handleRemoveItem(item.id, index)}
              >
                {item.text}
              </Item>
            )}
          </div>
        ))}
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder={typeof placeholder === 'string' ? placeholder : ''}
          className={classNames(
            'flex-grow outline-none text-sm p-1 min-w-[50px] focus:ring-0',
            { 'cursor-not-allowed': disabled },
            inputClassName
          )}
          disabled={disabled}
        />
        {typeof placeholder !== 'string' && inputValue === '' && (
          <div className="italic text-sm font-medium text-gray-800 tracking-tight">{placeholder}</div>
        )}
      </div>
      {error && showErrorMessage && <div className={classNames('text-red-500 text-sm mt-1', errorClassName)}>{error}</div>}
    </div>
  );
};

interface ItemProps {
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

export const Item: React.FC<ItemProps> = ({
  children,
  onRemove,
  className,
  removeButtonClassName,
  highlighted = false,
  disabled = false,
  icon, // New prop
  tabIndex,
  role,
  'aria-selected': ariaSelected,
  'data-chip-index': dataChipIndex,
}) => (
  <span 
    className={classNames(
      'inline-flex items-center bg-gray-100 text-gray-800 font-semibold rounded-md border border-gray-300 px-2 py-1 text-xs m-1',
      { 'ring-2 ring-black': highlighted },
      { 'opacity-50': disabled },
      className
    )}
    tabIndex={tabIndex}
    role={role}
    aria-selected={ariaSelected}
    data-chip-index={dataChipIndex}
  >
    {icon && <span className="mr-1">{icon}</span>}
    {children}
    {onRemove && (
      <button 
        onClick={onRemove} 
        className={classNames(
          'ml-1 text-gray-800 hover:text-gray-900 focus:outline-none',
          { 'cursor-not-allowed': disabled },
          removeButtonClassName
        )}
        disabled={disabled}
      >
        &times;
      </button>
    )}
  </span>
);
