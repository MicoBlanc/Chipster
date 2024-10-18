import React, { useState, useRef, ReactNode } from 'react';
import classNames from 'classnames';

interface ChipsterProps {
  children?: ReactNode;
  onAdd?: (value: string) => void;
  onRemove?: (index: number) => void;
  placeholder?: string | ReactNode;
  className?: string;
  inputClassName?: string;
  disabled?: boolean;
}

export const Chipster: React.FC<ChipsterProps> = ({
  children,
  onAdd,
  onRemove,
  placeholder = 'Type and press Enter',
  className,
  inputClassName,
  disabled = false,
}) => {
  const [currentInput, setCurrentInput] = useState<string>('');
  const [highlightedIndex, setHighlightedIndex] = useState<number | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (disabled) return;

    console.log('Key pressed:', e.key);
    console.log('Current input:', currentInput);
    console.log('Highlighted index:', highlightedIndex);

    if (e.key === 'Enter' && currentInput.trim() && onAdd) {
      e.preventDefault();
      onAdd(currentInput.trim());
      setCurrentInput('');
      setHighlightedIndex(null);
    } else if (e.key === 'Backspace' && currentInput === '') {
      e.preventDefault();
      const childCount = React.Children.count(children);
      
      if (childCount > 0) {
        if (highlightedIndex === null) {
          setHighlightedIndex(childCount - 1);
        } else {
          onRemove?.(highlightedIndex);
          setHighlightedIndex(null);
        }
      }
    }

    console.log('After operation - Highlighted index:', highlightedIndex);
  };

  return (
    <div 
      className={classNames(
        'flex flex-wrap items-center p-1 border bg-white border-gray-300 rounded-lg',
        'focus-within:ring-2 focus-within:ring-black focus-within:ring-offset-2',
        { 'opacity-50 cursor-not-allowed': disabled },
        className
      )}
      onClick={() => !disabled && inputRef.current?.focus()}
    >
      {React.Children.map(children, (child, index) => {
        console.log(`Rendering child ${index}, highlighted: ${index === highlightedIndex}`);
        return React.cloneElement(child as React.ReactElement, {
          highlighted: index === highlightedIndex,
          disabled: disabled
        });
      })}
      <input
        ref={inputRef}
        type="text"
        value={currentInput}
        onChange={(e) => !disabled && setCurrentInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={typeof placeholder === 'string' ? placeholder : ''}
        className={classNames(
          'flex-grow outline-none text-sm p-1 min-w-[50px] focus:ring-0',
          { 'cursor-not-allowed': disabled },
          inputClassName
        )}
        disabled={disabled}
      />
      {typeof placeholder !== 'string' && currentInput === '' && (
        <div className="italic text-sm font-medium text-gray-800 tracking-tight">{placeholder}</div>
      )}
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
