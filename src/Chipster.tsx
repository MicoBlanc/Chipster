import React, { useRef, ReactNode, useState, useCallback } from 'react';
import classNames from 'classnames';
import { useChipster, ChipsterItem, ValidationRule } from './useChipster';

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
      const success = addItem(inputValue);
      if (success) {
        onAdd?.(inputValue);
        setInputValue('');
      }
    } else if (e.key === 'Backspace' && inputValue === '') {
      e.preventDefault();
      if (highlightedIndex !== null) {
        const itemToRemove = items[highlightedIndex];
        removeItem(itemToRemove.id);
        onRemove?.(itemToRemove.id);
      } else if (items.length > 0) {
        highlightItem(items.length - 1);
      }
    }
  };

  return (
    <div>
      <div 
        className={classNames(
          'flex flex-wrap items-center p-0.5 border bg-white border-gray-300 rounded-lg',
          'focus-within:ring-2 focus-within:ring-black focus-within:ring-offset-2',
          { 'opacity-50 cursor-not-allowed': disabled },
          { 'border-red-500': error },
          className
        )}
        onClick={() => !disabled && inputRef.current?.focus()}
      >
        {items.map((item, index) => (
          renderItem ? (
            renderItem(item, index, index === highlightedIndex)
          ) : (
            <Item
              key={item.id}
              highlighted={index === highlightedIndex}
              disabled={disabled}
              icon={item.icon}
              onRemove={() => {
                removeItem(item.id);
                onRemove?.(item.id);
              }}
            >
              {item.text}
            </Item>
          )
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
