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

export default function DemoContentTags() {
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

  const codeSnippet = `import { Chipster } from 'chipster';

const popularTags = [
  { name: 'Technology', icon: '💻' },
  { name: 'Fashion', icon: '👗' },
  // ... other tags
];

function ContentTags() {
  const getSuggestions = (input) => {
    return popularTags
      .filter(tag => tag.name.toLowerCase().includes(input.toLowerCase()))
      .map(tag => \`\${tag.icon} \${tag.name}\`);
  };

  return (
    <Chipster
      placeholder="Add tags to your content"
      getSuggestions={getSuggestions}
      restrictToSuggestions={true}
      transform={(value) => value.toLowerCase().trim()}
      validationRules={[
        { test: (value) => value.length >= 2, message: 'Tag must be at least 2 characters' },
        { test: (value) => value.length <= 20, message: 'Tag must not exceed 20 characters' },
      ]}
      maxItems={10}
    />
  );
}`;

  return (
    <div className='font-sans flex flex-col items-center gap-2 justify-center w-full h-full'>
      <div className="px-3 py-6 w-full bg-gray-50 max-w-xl border border-gray-200 rounded-xl">
        <h2 className="text-base font-semibold mb-1 text-black">Keywords</h2>
        <Chipster
          className="bg-white shadow-sm rounded-lg"
          inputClassName="text-gray-700 placeholder-gray-400"
          errorClassName="text-red-600 font-semibold"
          chipDisabledClassName="opacity-50 cursor-not-allowed"
          chipIconClassName="mr-2"
          onAdd={(value: string) => console.log('Added tag:', value)}
          onRemove={(id: string) => console.log('Removed tag with id:', id)}
          placeholder="Add tags to your content"
          exitAnimation="fadeSlideLeft"
          validationRules={validationRules}
          maxItems={10}
          allowDuplicates={false}
          caseSensitive={false}
          transform={transform}
          showErrorMessage={true}
          restrictToSuggestions={true}
          getSuggestions={getSuggestions}
        />
      </div>
      <div className="w-full max-w-xl">
        <h3 className="text-base hidden font-semibold mb-2 text-black">Code Snippet</h3>
        <pre className="bg-gray-100 p-2 max-h-80 border border-gray-200 rounded-lg overflow-x-auto">
          <code className="text-xs font-mono">{codeSnippet}</code>
        </pre>
      </div>
    </div>
  );
}
