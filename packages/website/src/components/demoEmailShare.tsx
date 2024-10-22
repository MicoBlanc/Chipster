import { Chipster } from 'chipster';
import { ValidationRule } from 'chipster';
import { useCallback } from 'react';

const teamMembers = [
  { email: 'john@example.com', name: 'John Doe', avatar: 'https://i.pravatar.cc/150?u=john' },
  { email: 'jane@example.com', name: 'Jane Smith', avatar: 'https://i.pravatar.cc/150?u=jane' },
  { email: 'bob@example.com', name: 'Bob Johnson', avatar: 'https://i.pravatar.cc/150?u=bob' },
];

export default function DemoEmailShare() {

  const validationRules: ValidationRule[] = [
    { test: (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value), message: 'Invalid email format' },
  ];

  const getSuggestions = useCallback((input: string) => {
    const lowercasedInput = input.toLowerCase();
    return teamMembers
      .filter(member => member.email.toLowerCase().includes(lowercasedInput) || member.name.toLowerCase().includes(lowercasedInput))
      .map(member => `${member.name} <${member.email}>`);
  }, []);

  const getIcon = useCallback((value: string) => {
    const email = value.match(/<(.+)>/)?.[1];
    const member = teamMembers.find(m => m.email === email);
    return member ? <img src={member.avatar} alt={member.name} className="w-6 h-6 rounded-full" /> : null;
  }, []);
  

  return (
    <div className='bg-gray-100 font-sans flex items-center justify-center w-full h-screen'>
      <div className="p-4 bg-gray-100 w-full max-w-xl">
        <h2 className="text-base font-semibold mb-2">Share with your team</h2>
        <Chipster
          className="bg-white shadow-md rounded-lg p-2"
          inputClassName="text-gray-700 placeholder-gray-400"
          errorClassName="text-red-600 font-semibold"
          chipClassName="bg-blue-100 text-blue-800 border-blue-300 hover:bg-blue-200 transition-colors duration-200"
          chipHighlightedClassName="ring-2 ring-blue-500"
          chipDisabledClassName="opacity-50 cursor-not-allowed"
          chipIconClassName="mr-2"
          chipRemoveButtonClassName="ml-2 text-blue-500 hover:text-blue-700"
          onAdd={(value) => console.log('Added:', value)}
          onRemove={(id) => console.log('Removed item with id:', id)}
          placeholder="Enter team member's email"
          exitAnimation="fadeSlideLeft"
          validationRules={validationRules}
          allowDuplicates={false}
          caseSensitive={false}
          showErrorMessage={true}
          getSuggestions={getSuggestions}
          getIcon={getIcon}
        />
      </div>
    </div>
  );
}