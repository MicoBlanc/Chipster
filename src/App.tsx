import React, { useState } from 'react';
import Chipster from './Chipster';

function App() {
  const [items, setItems] = useState<string[]>([]);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Chipster Component Showcase</h1>
      </header>
      <main>
        <Chipster items={items} setItems={setItems} placeholder="Enter tags..." />
        <div className="">
          <h3>Current items:</h3>
          <pre>{JSON.stringify(items, null, 2)}</pre>
        </div>
      </main>
    </div>
  );
}

export default App;
