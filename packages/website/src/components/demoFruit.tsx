import { Chipster } from 'chipster';
import { ValidationRule } from 'chipster';
import { useState, useCallback } from 'react';

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

export default function DemoFruit() {
  const [chipsterItems, setChipsterItems] = useState([]);

  console.log(chipsterItems)

  const validationRules: ValidationRule[] = [
    { test: (value: string) => value.length >= 2, message: 'Must be at least 2 characters' },
    { test: (value: string) => value.length <= 20, message: 'Must not exceed 20 characters' },
  ];

  const transform = (value: string) => value.trim();

  const getSuggestions = useCallback((input: string) => {
    const lowercasedInput = input.toLowerCase();
    return fruitEmojis
      .filter(fruit => fruit.text.toLowerCase().includes(lowercasedInput))
      .map(fruit => `${fruit.emoji} ${fruit.text}`);
  }, []);

  return (
    <div className='bg-gray-100 font-sans flex items-center justify-center w-full h-screen'>
      <div className="p-4 bg-gray-100 w-full max-w-xl">
      <h2 className="text-base font-semibold mb-2">Type a fruit name</h2>

        <Chipster
          className="bg-white shadow-md rounded-lg p-1"
          inputClassName="text-gray-700 placeholder-gray-400"
          errorClassName="text-red-600 font-semibold"
          chipClassName="bg-gray-100 text-gray-800 border-gray-300 hover:bg-gray-200 transition-colors duration-200"
          chipHighlightedClassName="ring-2 ring-gray-800"
          chipDisabledClassName="opacity-50 cursor-not-allowed"
          chipIconClassName="mr-1"
          chipRemoveButtonClassName="ml-1"
          onAdd={(value) => console.log('Added:', value)}
          onRemove={(id) => console.log('Removed item with id:', id)}
          placeholder="Type a fruit name..."
          suggestionStyle="minimal"
          restrictToSuggestions={true}
          exitAnimation="fadeSlideLeft"
          validationRules={validationRules}
          maxItems={5}
          allowDuplicates={false}
          caseSensitive={false}
          transform={transform}
          showErrorMessage={true}
          getSuggestions={getSuggestions}
        />
      </div>
    </div>
  );
}
