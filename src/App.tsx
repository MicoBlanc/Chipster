import React, { useState } from 'react';
import { Chipster, Item } from './Chipster';

function App() {
  const [items, setItems] = useState<string[]>([]);

  const handleAdd = (newItem: string) => {
    setItems([...items, newItem]);
  };

  const handleRemove = (index: number) => {
    setItems(items.filter((_, i) => i !== index));
  };

  return (
    <div className="bg-gray-100 flex items-center justify-center w-full">

    <div className="p-4 max-w-xl">
      <h1 className="text-2xl font-bold mb-4">Chipster Demo</h1>
      <Chipster 
        onAdd={handleAdd} 
        placeholder={<span className="italic text-sm font-medium text-gray-400 tracking-tight">Type and press Enter...</span>}
      >
        {items.map((item, index) => (
          <Item className='' key={index} onRemove={() => handleRemove(index)}>
            {item}
          </Item>
        ))}
      </Chipster>
      <div className="mt-4">
        <h2 className="text-lg font-semibold">Current items:</h2>
        <pre className="bg-gray-100 p-2 rounded mt-2">
          {JSON.stringify(items, null, 2)}
        </pre>
      </div>
    </div>
    </div>
  );
}

export default App;
