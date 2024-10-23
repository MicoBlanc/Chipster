import { Chipster } from 'chipster';
import { ValidationRule } from 'chipster';
import { useCallback } from 'react';

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
    <div className='bg-red-100 font-sans flex items-center justify-center w-full h-screen'>
      <div className="p-4 bg-blue-100 w-full max-w-xl">
      <h2 className="text-base font-semibold mb-2">Type a fruit name</h2>

        <Chipster
          className="bg-white rounded-lg p-1"
          chipRemoveButtonClassName="ml-1"
          onAdd={(value) => console.log('Added:', value)}
          onRemove={(id) => console.log('Removed item with id:', id)}
          placeholder="Type a fruit name..."
          
          exitAnimation="fadeSlideLeft"
          validationRules={validationRules}
          maxItems={5}
          allowDuplicates={false}
          caseSensitive={false}
          transform={transform}
          suggestionStyle="minimal"
          restrictToSuggestions={true}
          getSuggestions={getSuggestions}
        />
      </div>
    </div>
  );
}
