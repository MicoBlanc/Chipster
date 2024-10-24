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

  const codeSnippet = `import { Chipster } from 'chipster';

const fruitEmojis = [
  { text: 'Apple', emoji: '🍎' },
  { text: 'Banana', emoji: '🍌' },
  // ... other fruits
];

function FruitPicker() {
  const getSuggestions = (input) => {
    return fruitEmojis
      .filter(fruit => fruit.text.toLowerCase().includes(input.toLowerCase()))
      .map(fruit => \`\${fruit.emoji} \${fruit.text}\`);
  };

  return (
    <Chipster
      placeholder="Type a fruit name"
      suggestionStyle="minimal"
      restrictToSuggestions={true}
      getSuggestions={getSuggestions}
    />
  );
}`;

  return (
    <div className='font-sans flex flex-col items-center gap-2 justify-center w-full h-full'>
      <div className="px-3 py-4 w-full bg-gray-50 max-w-xl bg-whit border rounded-xl">
        <h2 className="text-base font-semibold mb-1 text-black">Choose a Fruit</h2>
        <Chipster
          className="bg-white shadow-sm rounded-lg"
          onAdd={(value: string) => console.log('Added:', value)}
          onRemove={(id: string) => console.log('Removed item with id:', id)}
          placeholder="Type a fruit name"
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
      <div className="w-full max-w-xl">
        <h3 className="text-base hidden font-semibold mb-2 text-black">Code Snippet</h3>
        <pre className="bg-gray-100 p-2 max-h-80 border rounded-lg overflow-x-auto">
          <code className="text-xs font-mono">{codeSnippet}</code>
        </pre>
      </div>
    </div>
  );
}
