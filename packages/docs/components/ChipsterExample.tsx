import React from 'react';
import { Chipster } from '@micoblanc/chipster';
import styles from './ChipsterExample.module.css';

export default function ChipsterExample() {
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
        validationRules={[
          { test: (value) => value.includes('@'), message: 'Must be a valid email' },
        ]}
        getIcon={(value) => value.includes('@') ? '✉️' : null}
        maxItems={2}
        allowDuplicates={false}
        caseSensitive={false}
        transform={(value) => value.trim().toLowerCase()}
        showErrorMessage={true}      />
    </div>
  );
}
