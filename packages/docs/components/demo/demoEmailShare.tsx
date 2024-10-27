import { Chipster } from 'chipster';
import { ValidationRule } from 'chipster';
import { useCallback } from 'react';

const teamMembers = [
  { email: 'john@example.com', name: 'John Doe', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John' },
  { email: 'jane@example.com', name: 'Jane Smith', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jane' },
  { email: 'bob@example.com', name: 'Bob Johnson', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Bob' },
  { email: 'alice@example.com', name: 'Alice Williams', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alice' },
  { email: 'charlie@example.com', name: 'Charlie Brown', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Charlie' },
  { email: 'emma@example.com', name: 'Emma Davis', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emma' },
  { email: 'david@example.com', name: 'David Wilson', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=David' },
  { email: 'olivia@example.com', name: 'Olivia Taylor', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Olivia' },
];

export default function DemoEmailShare() {
  const validationRules: ValidationRule[] = [
    { test: (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value), message: 'Write a valid email' },
  ];

  const getSuggestions = useCallback((input: string) => {
    const lowercasedInput = input.toLowerCase();
    return teamMembers
      .filter(member => member.email.toLowerCase().includes(lowercasedInput) || member.name.toLowerCase().includes(lowercasedInput))
      .map(member => member.email);
  }, []);

  const getIcon = useCallback((value: string) => {
    const member = teamMembers.find(m => m.email === value);
    return member ? <img src={member.avatar} alt={member.name} width={20} height={20} className="rounded-full" /> : null;
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

  return (
    <Chipster
      placeholder="Enter team member's email"
      getSuggestions={getSuggestions}
      renderSuggestion={renderSuggestion}
      validationRules={[
        { test: (value) => /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(value), message: 'Write a valid email' },
      ]}
    />
  );
}`;

  return (
    <div className='font-sans flex flex-col items-center gap-2 justify-center w-full h-full'>
      <div className="px-3 py-6 w-full bg-gray-50 max-w-xl border border-gray-200 rounded-xl">
        <h2 className="text-base font-semibold mb-1 text-black">Share with your team</h2>
        <Chipster
          className="bg-white shadow-sm rounded-lg"
          onAdd={(value: string) => console.log('Added:', value)}
          onRemove={(id: string) => console.log('Removed item with id:', id)}
          defaultValue={['john@example.com', 'jane@example.com']}
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
      <div className="w-full max-w-xl">
        <h3 className="text-base hidden font-semibold mb-2 text-black">Code Snippet</h3>
        <pre className="bg-gray-100 p-2 max-h-80 border border-gray-200 rounded-lg overflow-x-auto">
          <code className="hidden text-xs font-mono">{codeSnippet}</code>
        </pre>
      </div>
    </div>
  );
}
