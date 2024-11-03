'use client'
import { Chipster } from '@micoblanc/chipster'
import { ValidationRule } from '@micoblanc/chipster'
import { useCallback } from 'react'
import { Disclosure } from '@headlessui/react'
import { CodeBracketIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { motion, AnimatePresence } from 'framer-motion'

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
]

export default function DemoFruit() {
  const validationRules: ValidationRule[] = [
    { 
      test: (value: string) => value.length <= 20, 
      message: 'Must not exceed 20 characters' 
    },
  ]

  const transform = useCallback((value: string) => value.trim(), [])

  const handleError = useCallback((error: string) => {
    console.log('Validation error:', error)
  }, [])

  const getSuggestions = useCallback((input: string) => {
    const lowercasedInput = input.toLowerCase()
    return fruitEmojis
      .filter(fruit => 
        fruit.text.toLowerCase().includes(lowercasedInput)
      )
      .map(fruit => ({
        label: fruit.text,
        icon: fruit.emoji,
        data: fruit
      }))
  }, [])

  const codeSnippet = `import { Chipster } from '@micoblanc/chipster'

const fruitEmojis = [
  { text: 'Apple', emoji: '🍎' },
  { text: 'Banana', emoji: '🍌' },
  // ... more fruits
]

export default function FruitPicker() {
  const getSuggestions = (input: string) => {
    return fruitEmojis
      .filter(fruit => 
        fruit.text.toLowerCase().includes(input.toLowerCase())
      )
      .map(fruit => ({
        label: fruit.text,
        icon: fruit.emoji,
        data: fruit
      }))
  }

  return (
    <Chipster>
      <Chipster.ItemList />
      <Chipster.Input placeholder="Type a fruit name..." />
      <Chipster.Validation
        validationRules={[
          { test: (v) => v.length <= 20, message: 'Max 20 characters' }
        ]}
        maxItems={10}
        allowDuplicates={false}
        transform={(v) => v.trim()}
      />
      <Chipster.Suggestions getSuggestions={getSuggestions} />
    </Chipster>
  )
}`

  return (
    <div className='font-sans flex flex-col items-center gap-2 justify-center w-full h-full'>
      <div className="px-3 py-6 w-full bg-neutral-50 max-w-xl border border-neutral-200 rounded-xl">
        <h2 className="text-base font-semibold mb-1 text-black">Choose a Fruit</h2>
        <Chipster theme="dark">
          <Chipster.ItemList 
            className='bg-gray-20' 
            itemClassName='bg-red-500 px-20 border-black'
            iconClassName="w-4 h-4 bg-blue-10"
          />
          <Chipster.Input 
            placeholder="Type a fruit name..."
          />
          <Chipster.Validation
            validationRules={validationRules}
            maxItems={10}
            allowDuplicates={false}
            transform={transform}
            onError={handleError}
            errorClassName="text-red-500 text-sm mt-1 px-2"
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
  )
}