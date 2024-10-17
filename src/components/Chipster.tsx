import React, { useState } from 'react';

interface ChipsterProps {
  items: string[];
  setItems: (items: string[]) => void;
  placeholder?: string;
}

const Chipster: React.FC<ChipsterProps> = ({ items, setItems, placeholder = 'Enter values...' }) => {
  const [currentInput, setCurrentInput] = useState<string>('');

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && currentInput.trim()) {
      e.preventDefault();
      setItems([...items, currentInput.trim()]);
      setCurrentInput('');
    }
  };

  const removeItem = (indexToRemove: number) => {
    setItems(items.filter((_, index) => index !== indexToRemove));
  };

  return (
    <div className="chipster">
      <div className="chips">
        {items.map((item, index) => (
          <span key={index} className="chip">
            {item}
            <button onClick={() => removeItem(index)}>&times;</button>
          </span>
        ))}
      </div>
      <input
        type="text"
        value={currentInput}
        onChange={(e) => setCurrentInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
      />
    </div>
  );
};

export default Chipster;