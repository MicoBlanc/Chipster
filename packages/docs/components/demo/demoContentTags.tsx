import { Chipster, ChipsterItem } from '@micoblanc/chipster';
import { ValidationRule } from '@micoblanc/chipster';
import { useCallback, useState } from 'react';
import { Disclosure } from '@headlessui/react';
import { CodeBracketIcon } from '@heroicons/react/24/outline';
import { motion, AnimatePresence } from 'framer-motion';

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
  const [currentTags, setCurrentTags] = useState<ChipsterItem[]>([]);

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
      <div className="px-3 py-6 w-full bg-neutral-50 max-w-xl border border-neutral-200 rounded-xl">
        <h2 className="text-base font-semibold mb-1 text-black">Keywords</h2>
        <Chipster
          className="bg-white shadow-sm rounded-lg"
          inputClassName="text-neutral-700 placeholder-neutral-400"
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
          onItemsChange={(items) => {
            setCurrentTags(items);
            console.log('Current validated tags:', items);
          }}
        />
      </div>

      <div className="w-full max-w-xl relative">
        <Disclosure>
          {({ open }) => (
            <div className='relative bg-neutral-100 rounded-xl border border-neutral-200 shadow-sm overflow-hidden'>
              <Disclosure.Button className="flex w-full items-center justify-between bg-neutral-100 px-4 py-2 text-left text-sm font-medium text-neutral-900 hover:bg-neutral-200 transition-colors duration-200 focus:outline-none focus-visible:ring focus-visible:ring-neutral-500 focus-visible:ring-opacity-75">
                <div className="flex items-center gap-2">
                  <CodeBracketIcon className="h-5 w-5" />
                  <span className='text-sm'>View Code</span>
                </div>
                <svg
                  className={`${!open ? 'rotate-180' : ''} h-5 w-5 text-neutral-500 transition-transform duration-200`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </Disclosure.Button>

              <AnimatePresence>
                {open && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ 
                      height: 'auto', 
                      opacity: 1,
                      transition: {
                        height: { duration: 0.3 },
                        opacity: { duration: 0.2, delay: 0.1 }
                      }
                    }}
                    exit={{ 
                      height: 0,
                      opacity: 0,
                      transition: {
                        height: { duration: 0.2 },
                        opacity: { duration: 0.1 }
                      }
                    }}
                    className="overflow-hidden"
                  >
                    <div className="bg-white m-1 px-2 rounded-lg border border-neutral-200 shadow-lg">
                      <pre className="overflow-x-auto overflow-y-auto max-h-[350px]">
                        <code className="text-xs font-mono whitespace-pre text-neutral-800">
                          {codeSnippet}
                        </code>
                      </pre>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
        </Disclosure>
      </div>
    </div>
  );
}
