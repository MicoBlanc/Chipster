import React, { useRef, useState, useCallback, useEffect } from 'react';
import styled from 'styled-components';
import classNames from 'classnames';
import { useChipster } from './useChipster';
import { getAnimationStyle, animations } from './animations';
import { ChipsterProps, ItemProps } from './types';

const ChipsterContainer = styled.div<{ suggestionStyle: 'fullWidth' | 'minimal' }>`
  position: relative;

  .chipster-container {
    position: relative;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    padding: 4px;
    border: 1px solid #d1d5db;
    background-color: #ffffff;
    border-radius: 0.50rem;

    &:focus-within {
      outline: 2px solid #000000;
      outline-offset: 2px;
    }

    &.chipster-container--disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    &.chipster-container--error {
      border-color: #ef4444;
      border-width: 2px;
    }
  }

  .chipster-input {
    flex-grow: 1;
    outline: none;
    background-color: transparent;
    font-size: 0.875rem;
    padding: 0.25rem;
    min-width: 50px;
    color: #000000;

    &:focus {
      box-shadow: none;
    }

    &:disabled {
      cursor: not-allowed;
    }
  }

  .chipster-error {
    color: #ef4444;
    font-size: 0.875rem;
    margin-top: 0.25rem;
  }

  .chipster-suggestions {
    position: absolute;
    z-index: 10;
    background-color: #ffffff;
    border: 1px solid #d1d5db;
    border-radius: 0.375rem;
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
    max-height: 15rem;
    overflow-y: auto;
    top: 100%;
    left: 0;

    ${props => props.suggestionStyle === 'fullWidth' ? `
      width: 100%;
    ` : `
      width: auto;
      min-width: 150px;
    `}
  }

  .chipster-suggestion {
    padding: 0.5rem 0.75rem;
    font-size: 0.875rem;
    color: #1f2937;
    cursor: pointer;

    &.chipster-suggestion--selected {
      background-color: #f3f4f6;
    }
  }

  .chipster-placeholder {
    font-style: italic;
    font-size: 0.875rem;
    font-weight: 500;
    color: #4b5563;
    letter-spacing: -0.025em;
  }
`;

const StyledItem = styled.span<{ highlighted: boolean; disabled: boolean }>`
  display: inline-flex;
  align-items: center;
  background-color: #f3f4f6;
  color: #1f2937;
  font-weight: 600;
  border-radius: 0.375rem;
  border: 1px solid #d1d5db;
  padding: 0.25rem 0.5rem;
  font-size: 0.75rem;
  margin: 0.125rem;

  ${props => props.highlighted && `
    outline: 2px solid #000000;
    outline-offset: 2px;
  `}

  ${props => props.disabled && `
    opacity: 0.5;
    cursor: not-allowed;
  `}

  .item-icon {
    margin-right: 0.25rem;
  }

  .item-remove-button {
    margin-left: 0.25rem;
    color: #4b5563;
    &:hover {
      color: #1f2937;
    }
    &:focus {
      outline: none;
    }
    ${props => props.disabled && `
      cursor: not-allowed;
    `}
  }
`;

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
  suggestionStyle = 'fullWidth',
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

  const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState(-1);

  const [activeDescendant, setActiveDescendant] = useState<string | undefined>();
  const listboxRef = useRef<HTMLUListElement>(null);

  const scrollActiveDescendantIntoView = useCallback(() => {
    if (activeDescendant && listboxRef.current) {
      const activeElement = listboxRef.current.querySelector(`#${activeDescendant}`);
      if (activeElement) {
        activeElement.scrollIntoView({ block: 'nearest' });
      }
    }
  }, [activeDescendant]);

  useEffect(() => {
    scrollActiveDescendantIntoView();
  }, [scrollActiveDescendantIntoView]);

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

    if (e.key === 'Enter') {
      e.preventDefault();
      if (showSuggestions && selectedSuggestionIndex !== -1) {
        handleAddItem(suggestions[selectedSuggestionIndex]);
        setInputValue('');
        clearSuggestions();
        setSelectedSuggestionIndex(-1);
        setActiveDescendant(undefined);
      } else {
        const success = handleAddItem(inputValue);
        if (success) {
          onAdd?.(inputValue);
          setInputValue('');
        }
      }
    } else if (e.key === 'ArrowDown' && showSuggestions) {
      e.preventDefault();
      const newIndex = selectedSuggestionIndex < suggestions.length - 1 ? selectedSuggestionIndex + 1 : selectedSuggestionIndex;
      setSelectedSuggestionIndex(newIndex);
      setActiveDescendant(`suggestion-${newIndex}`);
    } else if (e.key === 'ArrowUp' && showSuggestions) {
      e.preventDefault();
      const newIndex = selectedSuggestionIndex > 0 ? selectedSuggestionIndex - 1 : 0;
      setSelectedSuggestionIndex(newIndex);
      setActiveDescendant(`suggestion-${newIndex}`);
    } else if (e.key === 'Escape') {
      clearSuggestions();
      setSelectedSuggestionIndex(-1);
      setActiveDescendant(undefined);
      highlightItem(null);
    } else if (e.key === 'Backspace' && inputValue === '') {
      e.preventDefault();
      if (highlightedIndex !== null) {
        const itemToRemove = items[highlightedIndex];
        handleRemoveItem(itemToRemove.id, highlightedIndex);
        highlightItem(null);
      } else if (items.length > 0) {
        highlightItem(items.length - 1);
      }
    } else if (e.key === 'ArrowLeft' && inputValue === '') {
      e.preventDefault();
      if (highlightedIndex === null && items.length > 0) {
        highlightItem(items.length - 1);
      } else if (highlightedIndex !== null && highlightedIndex > 0) {
        highlightItem(highlightedIndex - 1);
      }
    } else if (e.key === 'ArrowRight' && inputValue === '') {
      e.preventDefault();
      if (highlightedIndex !== null) {
        if (highlightedIndex < items.length - 1) {
          highlightItem(highlightedIndex + 1);
        } else {
          highlightItem(null);
          inputRef.current?.focus();
        }
      }
    }
  };

  useEffect(() => {
    setSelectedSuggestionIndex(-1);
  }, [suggestions]);

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
    <ChipsterContainer suggestionStyle={suggestionStyle}>
      <div 
        className={`chipster-container ${className} ${disabled ? 'chipster-container--disabled' : ''} ${error ? 'chipster-container--error' : ''}`}
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
          className={`chipster-input ${inputClassName}`}
          disabled={disabled}
        />
        {typeof placeholder !== 'string' && inputValue === '' && (
          <div className="chipster-placeholder">{placeholder}</div>
        )}
      </div>
      {error && showErrorMessage && (
        <div className={`chipster-error ${errorClassName}`}>{error}</div>
      )}
      {showSuggestions && suggestions.length > 0 && (
        <ul 
          ref={listboxRef}
          role="listbox"
          id="suggestions-listbox"
          className="chipster-suggestions"
        >
          {suggestions.map((suggestion, index) => (
            <li
              id={`suggestion-${index}`}
              key={index}
              role="option"
              aria-selected={index === selectedSuggestionIndex}
              className={`chipster-suggestion ${index === selectedSuggestionIndex ? 'chipster-suggestion--selected' : ''}`}
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
    </ChipsterContainer>
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
  <StyledItem
    className={className}
    highlighted={highlighted}
    disabled={disabled}
    tabIndex={tabIndex}
    role={role}
    aria-selected={ariaSelected}
    data-chip-index={dataChipIndex}
  >
    {icon && <span className={`item-icon ${iconClassName}`}>{icon}</span>}
    {children}
    {onRemove && (
      <button 
        onClick={onRemove} 
        className={`item-remove-button ${removeButtonClassName}`}
        disabled={disabled}
      >
        &times;
      </button>
    )}
  </StyledItem>
);
