import React, { useRef, ReactNode } from 'react';
import classNames from 'classnames';
import { useChipster, ValidationResult, ChipsterItem } from './useChipster';

interface ChipsterProps {
  onAdd?: (value: string) => void;
  onRemove?: (id: string) => void;
  placeholder?: string | ReactNode;
  className?: string;
  inputClassName?: string;
  errorClassName?: string;
  disabled?: boolean;
  validate?: (value: string) => ValidationResult;
  getIcon?: (value: string) => React.ReactNode;
  maxItems?: number;
  allowDuplicates?: boolean;
  caseSensitive?: boolean;
  renderItem?: (item: ChipsterItem, index: number, highlighted: boolean) => ReactNode;
}

export const Chipster: React.FC<ChipsterProps> = ({
  onAdd,
  onRemove,
  placeholder = 'Type and press Enter',
  className,
  inputClassName,
  errorClassName,
  disabled = false,
  validate,
  getIcon,
  maxItems,
  allowDuplicates = false,
  caseSensitive = true,
  renderItem,
}) => {
  const { items, error, highlightedIndex, addItem, removeItem, highlightItem } = useChipster({ 
    validate, 
    getIcon, 
    maxItems, 
    allowDuplicates, 
    caseSensitive 
  });
  const inputRef = useRef<HTMLInputElement>(null);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (disabled) return;

    if (e.key === 'Enter' && inputRef.current) {
      e.preventDefault();
      const success = addItem(inputRef.current.value);
      if (success) {
        onAdd?.(inputRef.current.value);
        inputRef.current.value = '';
      }
    } else if (e.key === 'Backspace' && inputRef.current && inputRef.current.value === '') {
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
          'flex flex-wrap items-center p-1 border bg-white border-gray-300 rounded-lg',
          'focus-within:ring-2 focus-within:ring-black focus-within:ring-offset-2',
          { 'opacity-50 cursor-not-allowed': disabled },
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
          onKeyDown={handleKeyDown}
          placeholder={typeof placeholder === 'string' ? placeholder : ''}
          className={classNames(
            'flex-grow outline-none text-sm p-1 min-w-[50px] focus:ring-0',
            { 'cursor-not-allowed': disabled },
            inputClassName
          )}
          disabled={disabled}
        />
        {typeof placeholder !== 'string' && inputRef.current?.value === '' && (
          <div className="italic text-sm font-medium text-gray-800 tracking-tight">{placeholder}</div>
        )}
      </div>
      {error && <div className={classNames('text-red-500 text-sm mt-1', errorClassName)}>{error}</div>}
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
}

export const Item: React.FC<ItemProps> = ({
  children,
  onRemove,
  className,
  removeButtonClassName,
  highlighted = false,
  disabled = false,
  icon, // New prop
}) => (
  <span 
    className={classNames(
      'inline-flex items-center bg-gray-100 text-gray-800 font-semibold rounded-md border border-gray-300 px-2 py-1 text-sm m-1',
      { 'ring-2 ring-black ring-offset-1': highlighted },
      { 'opacity-50': disabled },
      className
    )}
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
