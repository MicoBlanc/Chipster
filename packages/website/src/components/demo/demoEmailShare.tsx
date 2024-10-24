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

  const codeSnippet = `import { Chipster } from 'chipster';

const teamMembers = [
  { email: 'john@example.com', name: 'John Doe', avatar: 'path/to/avatar' },
  // ... other team members
];

function EmailShare() {
  const getSuggestions = (input) => {
    return teamMembers
      .filter(member => member.email.includes(input) || member.name.includes(input))
      .map(member => member.email);
  };

  const renderSuggestion = (suggestion) => {
    const member = teamMembers.find(m => m.email === suggestion);
    return (
      <div className="flex items-center">
        <img src={member.avatar} alt={member.name} className="w-6 h-6 rounded-full mr-2" />
        <span>{member.name} ({member.email})</span>
      </div>
    );
  };

  return (
    <Chipster
      placeholder="Enter team member's email"
      getSuggestions={getSuggestions}
      renderSuggestion={renderSuggestion}
      validationRules={[
        { test: (value) => /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(value), message: 'Invalid email' },
      ]}
    />
  );
}`;

  return (
    <div className='font-sans flex flex-col items-center gap-2 justify-center w-full h-full'>
      <div className="px-3 py-4 w-full bg-gray-50 max-w-xl bg-white border rounded-xl">
        <h2 className="text-base font-semibold mb-1 text-black">Share with your team</h2>
        <Chipster
          className="bg-white shadow-sm rounded-lg"
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
