import React, { useState, useCallback } from 'react';
import { Chipster } from '@micoblanc/chipster';
import styles from './ChipsterExample.module.css';

const fruitEmojis = [
  { text: 'Apple', emoji: '🍎' },
  { text: 'Banana', emoji: '🍌' },
  { text: 'Cherry', emoji: '🍒' },
  { text: 'Grapes', emoji: '🍇' },
  { text: 'Lemon', emoji: '🍋' },
  { text: 'Orange', emoji: '🍊' },
  { text: 'Peach', emoji: '🍑' },
  { text: 'Pear', emoji: '🍐' },
  { text: 'Strawberry', emoji: '🍓' },
  { text: 'Watermelon', emoji: '🍉' },
];

export default function ChipsterExample2() {
  const [chipsterItems, setChipsterItems] = useState([]);

  const validationRules = [
    { test: (value) => value.length >= 2, message: 'Must be at least 2 characters' },
    { test: (value) => value.length <= 20, message: 'Must not exceed 20 characters' },
  ];

  const transform = (value: string) => value.trim();

  const getSuggestions = useCallback((input: string) => {
    const lowercasedInput = input.toLowerCase();
    return fruitEmojis
      .filter(fruit => fruit.text.toLowerCase().includes(lowercasedInput))
      .map(fruit => `${fruit.emoji} ${fruit.text}`);
  }, []);


  const handleItemsChange = useCallback((items) => {
    setChipsterItems(items);
    console.log('Current items:', items);
  }, []);

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
        onAdd={(value) => console.log('Added:', value)}
        onRemove={(id) => console.log('Removed item with id:', id)}
        placeholder="Type a fruit name..."
        exitAnimation="fadeSlideLeft"
        validationRules={validationRules}
        maxItems={5}
        allowDuplicates={false}
        caseSensitive={true}
        transform={transform}
        showErrorMessage={true}
        getSuggestions={getSuggestions}
        onItemsChange={handleItemsChange}
      />

    </div>
  );
}
