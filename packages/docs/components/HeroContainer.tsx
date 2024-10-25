import { Chipster } from 'chipster';
import { ValidationRule } from 'chipster';
import { useCallback } from 'react';

const popularTags = [
  { name: 'Technology', icon: '💻' },
  { name: 'Fashion', icon: '👗' },
  { name: 'Food', icon: '🍔' },
  { name: 'Travel', icon: '✈️' },
  { name: 'Sports', icon: '⚽' },
  { name: 'Music', icon: '🎵' },
  { name: 'Art', icon: '🎨' },
  { name: 'Health', icon: '🏥' },
];

export default function HeroContainer() {
  const validationRules: ValidationRule[] = [
    { test: (value: string) => value.length >= 2, message: 'Tag must be at least 2 characters' },
    { test: (value: string) => value.length <= 20, message: 'Tag must not exceed 20 characters' },
  ];

  const transform = (value: string) => value.toLowerCase().trim();

  const getSuggestions = useCallback((input: string) => {
    const lowercasedInput = input.toLowerCase();
    return popularTags
      .filter(tag => tag.name.toLowerCase().includes(lowercasedInput))
      .map(tag => `${tag.icon} ${tag.name}`);
  }, []);

  return (
    <div className='bg-gray-100 font-sans flex items-center justify-center w-full min-h-screen'>
      <div className="p-4 bg-gray-100 w-full max-w-xl">
        <h1 className="text-4xl font-bold mb-4">Chipster</h1>
        <p className="text-xl mb-6">A flexible and powerful multi-entry input component for React.</p>
        <Chipster
          className="bg-white shadow-sm rounded-lg p-2"
          inputClassName="text-gray-700 placeholder-gray-400"
          errorClassName="text-red-600 font-semibold"
          chipClassName="bg-green-100 text-green-800 border-green-300 hover:bg-green-200 transition-colors duration-200"
          chipHighlightedClassName="ring-2 ring-green-500"
          chipDisabledClassName="opacity-50 cursor-not-allowed"
          chipIconClassName="mr-2"
          chipRemoveButtonClassName="ml-2 text-green-500 hover:text-green-700"
          onAdd={(value: string) => console.log('Added tag:', value)}
          onRemove={(id: string) => console.log('Removed tag with id:', id)}
          placeholder="Try it out: Add some tags!"
          exitAnimation="fadeSlideLeft"
          validationRules={validationRules}
          maxItems={10}
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