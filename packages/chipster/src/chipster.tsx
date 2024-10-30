import React, { useRef, useState, useCallback, useEffect, useMemo } from 'react';
import { useChipster } from './useChipster';
import { getAnimationStyle, animations } from './animations';
import { ChipsterProps, ItemProps } from './types';
import classNames from 'classnames';
import styles from './chipster.module.css';

//utility functions
const getContainerClasses = (className: string, disabled: boolean, error: string | null, theme: 'light' | 'dark') => 
  classNames(
    styles.inputContainer,
    className,
    {
      [styles.inputContainerDisabled]: disabled,
      [styles.inputContainerError]: error,
      [styles.inputContainerDark]: theme === 'dark',
    }
  );

const getInputClasses = (inputClassName: string, theme: 'light' | 'dark') => 
  classNames(styles.input, inputClassName, {
    [styles.inputDark]: theme === 'dark',
  });

const getErrorClasses = (errorClassName: string, theme: 'light' | 'dark') => 
  classNames(styles.error, errorClassName, {
    [styles.errorDark]: theme === 'dark',
  });

const getSuggestionsClasses = (suggestionStyle: 'fullWidth' | 'minimal', theme: 'light' | 'dark') => 
  classNames(
    styles.suggestions,
    {
      [styles.suggestionsFull]: suggestionStyle === 'fullWidth',
      [styles.suggestionsMinimal]: suggestionStyle === 'minimal',
      [styles.suggestionsDark]: theme === 'dark',
    }
  );

const getSuggestionClasses = (index: number, selectedSuggestionIndex: number, theme: 'light' | 'dark') => 
  classNames(
    styles.suggestion,
    {
      [styles.suggestionSelected]: index === selectedSuggestionIndex,
      [styles.suggestionDark]: theme === 'dark',
    }
  );

export const Chipster: React.FC<ChipsterProps> = ({
  onAdd,
  onRemove,
  onItemsChange,
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
  restrictToSuggestions = false,
  getSuggestions,
  onInputChange,
  theme = 'light',
  defaultValue,
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
    defaultValue,
    onItemsChange,
  });
  const inputRef = useRef<HTMLInputElement>(null);
  const listboxRef = useRef<HTMLUListElement>(null);

  const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState(-1);
  const [activeDescendant, setActiveDescendant] = useState<string | undefined>();

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

  const filteredSuggestions = useMemo(() => {
    if (!getSuggestions) return [];
    let suggestionsArray = getSuggestions(inputValue);
    if (!allowDuplicates) {
      suggestionsArray = suggestionsArray.filter(
        suggestion => !items.some(item => item.text === suggestion)
      );
    }
    return suggestionsArray;
  }, [getSuggestions, inputValue, allowDuplicates, items]);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    if (newValue.trim().length > 0) {
      if (!restrictToSuggestions) {
        validateInput(newValue);
      }
      updateSuggestions(newValue);
    } else {
      clearValidation();
      clearSuggestions();
    }
    onInputChange?.(newValue);
  }, [validateInput, clearValidation, updateSuggestions, clearSuggestions, onInputChange, restrictToSuggestions]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (disabled) return;

    if (e.key === 'Enter') {
      e.preventDefault();
      if (showSuggestions && selectedSuggestionIndex !== -1) {
        handleAddItem(filteredSuggestions[selectedSuggestionIndex]);
        setInputValue('');
        clearSuggestions();
        setSelectedSuggestionIndex(-1);
        setActiveDescendant(undefined);
      } else if (!restrictToSuggestions) {
        const success = handleAddItem(inputValue);
        if (success) {
          onAdd?.(inputValue);
          setInputValue('');
        }
      }
    } else if (e.key === 'ArrowDown' && showSuggestions) {
      e.preventDefault();
      const newIndex = selectedSuggestionIndex < filteredSuggestions.length - 1 ? selectedSuggestionIndex + 1 : selectedSuggestionIndex;
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
  }, [filteredSuggestions]);

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
    <div className={classNames(styles.container, { [styles.containerDark]: theme === 'dark' })}>
      <div 
        className={getContainerClasses(className ?? '', disabled, error, theme)}
        data-disabled={disabled || undefined}
        data-error={error || undefined}
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
                theme={theme}
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
          onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
          placeholder={typeof placeholder === 'string' ? placeholder : ''}
          className={getInputClasses(inputClassName ?? '', theme)}
          disabled={disabled}
        />
        {typeof placeholder !== 'string' && inputValue === '' && (
          <div className={classNames(styles.placeholder, { [styles.placeholderDark]: theme === 'dark' })}>{placeholder}</div>
        )}
      </div>
      {showSuggestions && filteredSuggestions.length > 0 && (
        <ul 
          ref={listboxRef}
          role="listbox"
          id="suggestions-listbox"
          className={getSuggestionsClasses(suggestionStyle, theme)}
        >
          {filteredSuggestions.map((suggestion, index) => (
            <li
              id={`suggestion-${index}`}
              key={index}
              role="option"
              aria-selected={index === selectedSuggestionIndex}
              className={getSuggestionClasses(index, selectedSuggestionIndex, theme)}
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
      {error && showErrorMessage && (
        <div className={getErrorClasses(errorClassName || '', theme)}>{error}</div>
      )}
    </div>
  );
};


export const Item: React.FC<ItemProps & { theme?: 'light' | 'dark' }> = ({
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
  theme = 'light',
}) => {
  const itemClasses = classNames(
    styles.item,
    className,
    {
      [styles.itemHighlighted]: highlighted && theme === 'light',
      [styles.itemHighlightedDark]: highlighted && theme === 'dark',
      [styles.itemDisabled]: disabled,
      [styles.itemDark]: theme === 'dark',
    }
  );

  const iconClasses = classNames(styles.itemIcon, iconClassName, {
    [styles.itemIconDark]: theme === 'dark',
  });
  const removeButtonClasses = classNames(styles.itemRemove, removeButtonClassName, {
    [styles.itemRemoveDark]: theme === 'dark',
  });

  return (
    <span
      className={itemClasses}
      data-highlighted={highlighted || undefined}
      data-disabled={disabled || undefined}
      tabIndex={tabIndex}
      role={role}
      aria-selected={ariaSelected}
      data-chip-index={dataChipIndex}
    >
      {icon && <span className={iconClasses}>{icon}</span>}
      {children}
      {onRemove && (
        <button 
          onClick={onRemove} 
          className={removeButtonClasses}
          disabled={disabled}
        >
          &times;
        </button>
      )}
    </span>
  );
};

