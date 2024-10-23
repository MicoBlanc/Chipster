import { Chipster } from 'chipster';
import { ValidationRule } from 'chipster';
import { useCallback } from 'react';
import Image from 'next/image';

const teamMembers = [
  { email: 'john@example.com', name: 'John Doe', avatar: 'https://i.pravatar.cc/150?u=john' },
  { email: 'jane@example.com', name: 'Jane Smith', avatar: 'https://i.pravatar.cc/150?u=jane' },
  { email: 'bob@example.com', name: 'Bob Johnson', avatar: 'https://i.pravatar.cc/150?u=bob' },
  { email: 'alice@example.com', name: 'Alice Williams', avatar: 'https://i.pravatar.cc/150?u=alice' },
  { email: 'charlie@example.com', name: 'Charlie Brown', avatar: 'https://i.pravatar.cc/150?u=charlie' },
  { email: 'diana@example.com', name: 'Diana Prince', avatar: 'https://i.pravatar.cc/150?u=diana' },
  { email: 'evan@example.com', name: 'Evan White', avatar: 'https://i.pravatar.cc/150?u=evan' },
  { email: 'fiona@example.com', name: 'Fiona Green', avatar: 'https://i.pravatar.cc/150?u=fiona' },
];

export default function DemoEmailShare() {
  const validationRules: ValidationRule[] = [
    { test: (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value), message: 'Invalid email format' },
  ];

  const getSuggestions = useCallback((input: string) => {
    const lowercasedInput = input.toLowerCase();
    return teamMembers
      .filter(member => member.email.toLowerCase().includes(lowercasedInput) || member.name.toLowerCase().includes(lowercasedInput))
      .map(member => member.email);
  }, []);

  const getIcon = useCallback((value: string) => {
    const member = teamMembers.find(m => m.email === value);
    return member ? <Image src={member.avatar} alt={member.name} width={20} height={20} className="rounded-full" /> : null;
  }, []);

  const renderSuggestion = useCallback((suggestion: string) => {
    const member = teamMembers.find(m => m.email === suggestion);
    if (!member) return suggestion;

    return (
      <div className="flex items-center space-x-2">
        <Image src={member.avatar} alt={member.name} width={24} height={24} className="rounded-full" />
        <span>{member.name}</span>
        <span className="text-gray-500 text-sm">({member.email})</span>
      </div>
    );
  }, []);

  return (
    <div className='bg-whit font-sans flex items-center justify-center w-full h-full bg-red-300'>
      <div className="p-4 w-full flex flex-col items-start rounded-xl">
        <h2 className="text-base font-semibold mb-1">Share with your team</h2>
        <Chipster
          onAdd={(value: string) => console.log('Added:', value)}
          onRemove={(id: string) => console.log('Removed item with id:', id)}
          placeholder="Enter team member's email"
          exitAnimation="fadeSlideLeft"
          validationRules={validationRules}
          allowDuplicates={false}
          caseSensitive={false}
          showErrorMessage={true}
          getSuggestions={getSuggestions}
          getIcon={getIcon}
          renderSuggestion={renderSuggestion}
          className="bg-white shadow-sm rounded-lg p-2"
          inputClassName="text-gray-700 placeholder-gray-400"
          errorClassName="text-red-600 text-sm mt-1"
          chipClassName="bg-blue-100 text-blue-800 border border-blue-300"
          chipHighlightedClassName="ring-2 ring-blue-500"
          chipIconClassName="mr-1"
        />
      </div>
    </div>
  );
}
