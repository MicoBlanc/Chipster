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
  chipClassName,
  chipHighlightedClassName,
  chipDisabledClassName,
  chipIconClassName,
  chipRemoveButtonClassName,
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
  getSuggestions,
  onInputChange,
}) => {
  const [inputValue, setInputValue] = useState('');
  const { 
    items, 
    error, 
    highlightedIndex, 
    suggestions,
    showSuggestions,
    suggestionsRef,
    addItem, 
    removeItem, 
    highlightItem,
    validateInput,
    clearValidation,
    updateSuggestions,
    clearSuggestions,
    setShowSuggestions,
  } = useChipster({ 
    validationRules, 
    getIcon, 
    maxItems, 
    maxItemsMessage,
    allowDuplicates, 
    caseSensitive,
    transform,
    showErrorMessage,
    getSuggestions,
  });
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    if (newValue.trim().length > 0) {
      validateInput(newValue);
      updateSuggestions(newValue);
    } else {
      clearValidation();
      clearSuggestions();
    }
    onInputChange?.(newValue);
  }, [validateInput, clearValidation, updateSuggestions, clearSuggestions, onInputChange]);

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
    <div ref={containerRef} className="relative">
      <div 
        className={classNames(
          'relative flex flex-wrap items-center p-0.5 border bg-white shadow-sm border-gray-300 rounded-lg',
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
                className={chipClassName}
                highlightedClassName={chipHighlightedClassName}
                disabledClassName={chipDisabledClassName}
                iconClassName={chipIconClassName}
                removeButtonClassName={chipRemoveButtonClassName}
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
          onFocus={() => setShowSuggestions(true)}
          placeholder={typeof placeholder === 'string' ? placeholder : ''}
          className={classNames(
            'flex-grow outline-none bg-transparent text-sm p-1 min-w-[50px] text-black focus:ring-0',
            { 'cursor-not-allowed': disabled },
            inputClassName
          )}
          disabled={disabled}
        />
        {typeof placeholder !== 'string' && inputValue === '' && (
          <div className="italic text-sm font-medium text-gray-800 tracking-tight">{placeholder}</div>
        )}
      </div>
      <div className="relative">
        {error && showErrorMessage && (
          <div className={classNames('text-red-500 text-sm mt-1', errorClassName)}>{error}</div>
        )}
        {showSuggestions && suggestions.length > 0 && (
          <ul 
            ref={suggestionsRef}
            className={classNames(
              'absolute z-10 w-full bg-white border border-gray-300 rounded-md shadow-sm',
              'max-h-60 overflow-auto',
              'top-1 left-0'
            )}
          >
            {suggestions.map((suggestion, index) => (
              <li
                key={index}
                className="px-3 py-2 text-gray-700 font-medium text-sm hover:bg-gray-100 cursor-pointer"
                onClick={() => {
                  handleAddItem(suggestion);
                  setInputValue('');
                  clearSuggestions();
                }}
              >
                {suggestion}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};


export const Item: React.FC<ItemProps> = ({
  children,
  onRemove,
  className,
  highlightedClassName,
  disabledClassName,
  iconClassName,
  removeButtonClassName,
  highlighted = false,
  disabled = false,
  icon,
  tabIndex,
  role,
  'aria-selected': ariaSelected,
  'data-chip-index': dataChipIndex,
}) => (
  <span 
    className={classNames(
      'inline-flex items-center bg-gray-100 text-gray-800 font-semibold rounded-md border border-gray-300 px-2 py-1 text-xs m-0.5',
      { [highlightedClassName || 'ring-2 ring-black']: highlighted },
      { [disabledClassName || 'opacity-50']: disabled },
      className
    )}
    tabIndex={tabIndex}
    role={role}
    aria-selected={ariaSelected}
    data-chip-index={dataChipIndex}
  >
    {icon && <span className={classNames('mr-1', iconClassName)}>{icon}</span>}
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

