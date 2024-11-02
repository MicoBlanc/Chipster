import { Chipster } from '@micoblanc/chipster';
import { useCallback } from 'react';
import { Disclosure } from '@headlessui/react';
import { CodeBracketIcon } from '@heroicons/react/24/outline';
import { motion, AnimatePresence } from 'framer-motion';

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

const codeSnippet = `import { Chipster } from '@micoblanc/chipster';

const teamMembers = [
  { email: 'john@example.com', name: 'John Doe', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John' },
  // ... more team members
];

export default function EmailShare() {
  const getSuggestions = (input: string) => {
    const lowercasedInput = input.toLowerCase();
    return teamMembers
      .filter(member => 
        member.email.toLowerCase().includes(lowercasedInput) || 
        member.name.toLowerCase().includes(lowercasedInput)
      )
      .map(member => ({
        label: member.email,
        icon: (
          <div className="flex items-center gap-2">
            <img 
              src={member.avatar} 
              alt={member.name} 
              width={20} 
              height={20} 
              className="rounded-full" 
            />
            <span className="text-sm text-neutral-500">{member.name}</span>
          </div>
        )
      }));
  };

  return (
    <Chipster>
      <Chipster.ItemList />
      <Chipster.Input 
        className="bg-white shadow-sm rounded-lg"
        placeholder="Enter team member's email"
      />
      <Chipster.Validation
        validationRules={[
          { 
            test: (v) => /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(v), 
            message: 'Write a valid email' 
          }
        ]}
        allowDuplicates={false}
        onError={(error) => console.log('Validation error:', error)}
      />
      <Chipster.Suggestions
        getSuggestions={getSuggestions}
        style="minimal"
      />
    </Chipster>
  );
}`;

export default function DemoEmailShare() {
  const getSuggestions = useCallback((input: string) => {
    const lowercasedInput = input.toLowerCase();
    return teamMembers
      .filter(member => 
        member.email.toLowerCase().includes(lowercasedInput) || 
        member.name.toLowerCase().includes(lowercasedInput)
      )
      .map(member => ({
        label: member.email,
        icon: (
          <div className="flex items-center gap-1">
            <img 
              src={member.avatar} 
              alt={member.name} 
              width={20} 
              height={20} 
              className="rounded-full" 
            />
            <span className="text-sm font-medium text-neutral-800">{member.name}</span>
          </div>
        )
      }));
  }, []);

  return (
    <div className='font-sans flex flex-col items-center gap-2 justify-center w-full h-full'>
      <div className="px-3 py-6 w-full bg-neutral-50 max-w-xl border border-neutral-200 rounded-xl">
        <h2 className="text-base font-semibold mb-1 text-black">Share with your team</h2>
        <Chipster>
          <Chipster.ItemList />
          <Chipster.Input 
            className="bg-white shadow-sm rounded-lg"
            placeholder="Enter team member's email"
          />
          <Chipster.Validation
            validationRules={[
              { 
                test: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v), 
                message: 'Write a valid email' 
              }
            ]}
            allowDuplicates={false}
            onError={(error) => console.log('Validation error:', error)}
          />
          <Chipster.Suggestions
            getSuggestions={getSuggestions}
          />
        </Chipster>
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
                    <div className=" bg-white m-1 px-2 rounded-lg border border-neutral-200 shadow-lg">
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
