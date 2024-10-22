import React from 'react';
import { Chipster } from '@micoblanc/chipster';
import styles from './ChipsterExample.module.css';

export default function ChipsterExample() {

  const validationRules = [
    { test: (value) => value.length >= 2, message: 'Must be at least 2 characters' },
    { test: (value) => value.length <= 20, message: 'Must not exceed 30 characters' },
    { test: (value) => value.includes('@'), message: 'Must be a valid email' },
  ];

  return (
    <div className={styles.container}>
      <Chipster
        className={styles.chipster}
        inputClassName={styles.input}
        errorClassName={styles.error}
        chipClassName={styles.chip}
        chipHighlightedClassName={styles.chipHighlighted}
        chipDisabledClassName={styles.chipDisabled}
        chipIconClassName={styles.chipIcon}
        chipRemoveButtonClassName={styles.chipRemoveButton}
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
