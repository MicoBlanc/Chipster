import React from 'react';
import { FaUser, FaEnvelope, FaPhone } from 'react-icons/fa';
import { ValidationRule } from './types';
import { Chipster } from './chipster';

function App() {
  const validationRules: ValidationRule[] = [
    { test: (value: string) => value.length >= 3, message: 'Must be at least 3 characters' },
    { test: (value: string) => value.length <= 50, message: 'Must not exceed 50 characters' },
  ];

  const getIcon = (value: string) => {
    if (value.includes('@')) return <FaEnvelope />;
    if (value.match(/^\d+$/)) return <FaPhone />;
    return <FaUser />;
  };

  const transform = (value: string) => value.trim().toLowerCase();

  return (
    <div className='bg-gray-100 flex items-center justify-center w-full h-screen'>
      <div className="p-4 bg-gray-100 w-full max-w-xl">
        <Chipster
          onAdd={(value) => console.log('Added:', value)}
          onRemove={(id) => console.log('Removed item with id:', id)}
          placeholder="Add items..."
          exitAnimation="fadeSlideLeft"
          validationRules={validationRules}
          getIcon={getIcon}
          maxItems={10}
          allowDuplicates={false}
          caseSensitive={false}
          transform={transform}
          showErrorMessage={true}
        />
      </div>
    </div>
  );
}

export default App;
