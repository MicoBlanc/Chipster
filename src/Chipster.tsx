import React, { useState, useRef, ReactNode } from 'react';
import classNames from 'classnames';

interface ChipsterProps {
  children?: ReactNode;
  onAdd?: (value: string) => void;
  placeholder?: string | ReactNode;
  className?: string;
  inputClassName?: string;
}

export const Chipster: React.FC<ChipsterProps> = ({
  children,
  onAdd,
  placeholder = 'Type and press Enter',
  className,
  inputClassName,
}) => {
  const [currentInput, setCurrentInput] = useState<string>('');
  const inputRef = useRef<HTMLInputElement>(null);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && currentInput.trim() && onAdd) {
      e.preventDefault();
      onAdd(currentInput.trim());
      setCurrentInput('');
    }
  };

  return (
    <div 
      className={classNames(
        'flex flex-wrap items-center p-1.5 border bg-white border-gray-300 rounded-md focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500',
        className
      )}
      onClick={() => inputRef.current?.focus()}
    >
      {children}
      <input
        ref={inputRef}
        type="text"
        value={currentInput}
        onChange={(e) => setCurrentInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={typeof placeholder === 'string' ? placeholder : ''}
        className={classNames(
          'flex-grow outline-none text-sm p-1 min-w-[50px]',
          inputClassName
        )}
      />
      {typeof placeholder !== 'string' && currentInput === '' && (
        <div className="italic text-sm font-medium text-gray-400 tracking-tight">{placeholder}</div>
      )}
    </div>
  );
};

interface ItemProps {
  children: ReactNode;
  onRemove?: () => void;
  className?: string;
  removeButtonClassName?: string;
}

export const Item: React.FC<ItemProps> = ({
  children,
  onRemove,
  className,
  removeButtonClassName,
}) => (
  <span 
    className={classNames(
      'inline-flex items-center bg-gray-100 text-gray-800 font-semibold rounded-md border border-gray-300 px-2 py-1 text-sm m-1',
      className
    )}
  >
    {children}
    {onRemove && (
      <button 
        onClick={onRemove} 
        className={classNames(
          'ml-1 text-gray-800 hover:text-gray-900 focus:outline-none',
          removeButtonClassName
        )}
      >
        &times;
      </button>
    )}
  </span>
);
