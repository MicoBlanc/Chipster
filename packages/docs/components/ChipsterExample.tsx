import React from 'react';
import { Chipster } from '@micoblanc/chipster';


export default function ChipsterExample() {

  const validationRules = [
    { test: (value) => value.length >= 2, message: 'Must be at least 2 characters' },
    { test: (value) => value.length <= 50, message: 'Must not exceed 50 characters' },
    { test: (value) => value.includes('@'), message: 'Must be a valid email' },
  ];

  return (
    <div >
      <Chipster
      
        placeholder="Enter emails"
        onAdd={(item) => console.log('Added:', item)}
        onRemove={(item) => console.log('Removed:', item)}
        validationRules={validationRules}
        getIcon={(value) => value.includes('@') ? '✉️' : null}
        maxItems={3}
        allowDuplicates={false}
        caseSensitive={false}
        transform={(value) => value.trim().toLowerCase()}
        showErrorMessage={true}      
        />
    </div>
  );
}
