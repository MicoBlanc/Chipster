import React, { useState, useCallback } from 'react';
import { Chipster } from '@micoblanc/chipster';

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

  return (
    <div>
      <Chipster
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
      />

    </div>
  );
}
