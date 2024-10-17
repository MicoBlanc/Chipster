import React, { useState, useRef, useEffect } from 'react';
import classNames from 'classnames';

interface ChipsterProps {
  items: string[];
  setItems: (items: string[]) => void;
  placeholder?: string;
  className?: string;
  chipClassName?: string;
  inputClassName?: string;
  removeButtonClassName?: string;
}

const Chipster: React.FC<ChipsterProps> = ({
  items,
  setItems,
  placeholder = 'Enter values...',
  className,
  chipClassName,
  inputClassName,
  removeButtonClassName,
}) => {
  const [currentInput, setCurrentInput] = useState<string>('');
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && currentInput.trim()) {
      e.preventDefault();
      setItems([...items, currentInput.trim()]);
      setCurrentInput('');
    } else if (e.key === 'Backspace' && currentInput === '' && items.length > 0) {
      setItems(items.slice(0, -1));
    }
  };

  const removeItem = (indexToRemove: number) => {
    setItems(items.filter((_, index) => index !== indexToRemove));
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [items]);

  const handleContainerClick = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <div 
      ref={containerRef}
      className={classNames(
        'flex flex-wrap bg-red-500 items-center p-2 border border-gray-300 rounded-md focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500',
        className
      )}
      onClick={handleContainerClick}
    >
      {items.map((item, index) => (
        <span 
          key={index} 
          className={classNames(
            'inline-flex items-center bg-blue-100 text-blue-800 rounded-full px-2 py-1 text-sm m-1',
            chipClassName
          )}
        >
          {item}
          <button 
            onClick={() => removeItem(index)} 
            className={classNames(
              'ml-1 text-blue-600 hover:text-blue-800 focus:outline-none',
              removeButtonClassName
            )}
          >
            &times;
          </button>
        </span>
      ))}
      <input
        ref={inputRef}
        type="text"
        value={currentInput}
        onChange={(e) => setCurrentInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={items.length === 0 ? placeholder : ''}
        className={classNames(
          'flex-grow outline-none text-sm p-1 min-w-[50px]',
          inputClassName
        )}
      />
    </div>
  );
};

export default Chipster;
