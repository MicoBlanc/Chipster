import { Chipster } from '@micoblanc/chipster';
import { Disclosure } from '@headlessui/react';
import { CodeBracketIcon } from '@heroicons/react/24/outline';
import { motion, AnimatePresence } from 'framer-motion';

const codeSnippet = `import { Chipster } from '@micoblanc/chipster';

export default function EmailShare() {
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
    </Chipster>
  );
}`;

export default function DemoEmailShare() {
  return (
    <div className='font-sans flex flex-col items-center gap-2 justify-center w-full h-full'>
      <div className="px-3 py-6 w-full bg-neutral-50 max-w-xl border border-neutral-200 rounded-xl">
        <h2 className="text-base font-semibold mb-1 text-black">Share with your team</h2>
        <Chipster mode='free' joiner={[';', 'Tab', 'Enter']}>
          <Chipster.ItemList />
          <Chipster.Input 
            className="bg-white shadow-sm rounded-lg"
            placeholder="Enter team member's email"
          />
          <Chipster.Validation
            validationRules={[
              { 
                test: (v) => {
                  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
                  return emailRegex.test(v)
                },
                message: 'Please enter a valid email address'
              }
            ]}
            allowDuplicates={false}
            onError={(error) => console.log('Validation error:', error)}
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
