import React, { useState } from 'react';
import { Chipster, Item } from './Chipster';

function App() {
  const [items, setItems] = useState<string[]>([]);

  const addItem = (newItem: string) => {
    setItems(prevItems => [...prevItems, newItem]);
  };

  const removeItem = (index: number) => {
    console.log('Removing item at index:', index);
    setItems(prevItems => prevItems.filter((_, i) => i !== index));
  };

  return (
    <div className="p-4">
      <Chipster
        onAdd={addItem}
        onRemove={removeItem}
        placeholder="Add items..."
      >
        {items.map((item, index) => (
          <Item key={index}>
            {item}
          </Item>
        ))}
      </Chipster>
      <div className="mt-4">
        <h2>Current items:</h2>
        <pre>{JSON.stringify(items, null, 2)}</pre>
      </div>
    </div>
  );
}

export default App;
