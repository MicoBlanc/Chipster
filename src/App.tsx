import React from 'react';
import { Chipster } from './Chipster';
import { FaUser, FaEnvelope, FaPhone } from 'react-icons/fa';

function App() {
  const validate = (value: string) => {
    if (value.length < 3) {
      return { isValid: false, errorMessage: 'Input must be at least 3 characters long' };
    }
    if (value.length > 50) {
      return { isValid: false, errorMessage: 'Input must not exceed 20 characters' };
    }
    return { isValid: true };
  };

  const getIcon = (value: string) => {
    if (value.includes('@')) return <FaEnvelope />;
    if (value.match(/^\d+$/)) return <FaPhone />;
    return <FaUser />;
  };

  return (
    <div className='bg-gray-100 flex items-center justify-center w-full h-screen'>
      <div className="p-4 bg-gray-100 w-full max-w-xl">
        <Chipster
          onAdd={(value) => console.log('Added:', value)}
          onRemove={(id) => console.log('Removed item with id:', id)}
          placeholder="Add items..."
          validate={validate}
          getIcon={getIcon}
          maxItems={5}
          allowDuplicates={false}
          caseSensitive={false}
        />
      </div>
    </div>
  );
}

export default App;
