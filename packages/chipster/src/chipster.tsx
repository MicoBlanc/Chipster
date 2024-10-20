import React, { useRef, useState, useCallback } from 'react';
import classNames from 'classnames';
import { useChipster } from './useChipster';
import { getAnimationStyle, animations } from './animations';
import { ChipsterProps, ItemProps } from './types';

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
  exitAnimation,
}) => {
  const [inputValue, setInputValue] = useState('');
  const { 
    items, 
    error, 
    highlightedIndex, 
    addItem, 
    removeItem, 
    highlightItem,
    validateInput,
    clearValidation
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
    if (newValue.trim().length > 0) {
      validateInput(newValue);
    } else {
      clearValidation();
    }
  }, [validateInput, clearValidation]);

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

  const actualExitAnimation = exitAnimation && (typeof exitAnimation === 'string' 
    ? animations[exitAnimation] 
    : exitAnimation);

  const handleAddItem = useCallback((text: string) => {
    const newItemId = addItem(text);
    return !!newItemId;
  }, [addItem]);

  const handleRemoveItem = useCallback((id: string, index: number) => {
    if (actualExitAnimation) {
      const chipElement = document.getElementById(`chip-${id}`);
      if (chipElement) {
        Object.assign(chipElement.style, getAnimationStyle(actualExitAnimation.exit, true));
        setTimeout(() => {
          removeItem(id);
          onRemove?.(id);
        }, actualExitAnimation.exit.duration);
      } else {
        removeItem(id);
        onRemove?.(id);
      }
    } else {
      removeItem(id);
      onRemove?.(id);
    }
  }, [removeItem, onRemove, actualExitAnimation]);

  return (
    <div>
      <div 
        className={classNames(
          'flex flex-wrap items-center p-0.5 border bg-transparent border-gray-300 rounded-lg',
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
