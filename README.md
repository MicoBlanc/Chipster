# Chipster

![chipster1](https://github.com/user-attachments/assets/7f7f09be-6e80-4d0e-81f5-fb395a92a0ff)

Chipster is a flexible multi-entry input component for React. Perfect for managing tags, email addresses, or any list-based input scenario with built-in validation and suggestions support.

## Installation

```bash
npm install @micoblanc/chipster
```

## Basic Usage

```tsx
import { Chipster } from '@micoblanc/chipster'

export default function BasicExample() {
  return (
    <Chipster>
      <Chipster.ItemList />
      <Chipster.Input placeholder="Type and press Enter" />
      <Chipster.Validation
        validationRules={[
          { test: (v) => v.length >= 2, message: 'Min 2 characters' },
          { test: (v) => v.length <= 20, message: 'Max 20 characters' }
        ]}
        maxItems={10}
        allowDuplicates={false}
      />
    </Chipster>
  )
}
```

## Features

- 🎨 **Highly Customizable**: Style with Tailwind classes and theme support
- 🔍 **Smart Suggestions**: Built-in autocomplete with custom suggestions
- ✅ **Validation**: Flexible validation rules and constraints
- ⌨️ **Keyboard Navigation**: Full keyboard support for better accessibility
- 🌓 **Theme Support**: Built-in light and dark themes
- 🎯 **Composable**: Mix and match components as needed

## Advanced Usage with Suggestions

```tsx
const suggestions = [
  { label: 'JavaScript', icon: '🟨' },
  { label: 'TypeScript', icon: '🔷' },
  { label: 'React', icon: '⚛️' }
]

export default function AdvancedExample() {
  const getSuggestions = useCallback((input: string) => {
    return suggestions
      .filter(item => 
        item.label.toLowerCase().includes(input.toLowerCase())
      )
      .map(item => ({
        label: item.label,
        icon: item.icon,
        data: item
      }))
  }, [])

  return (
    <Chipster>
      <Chipster.ItemList />
      <Chipster.Input placeholder="Search technologies..." />
      <Chipster.Suggestions getSuggestions={getSuggestions} />
    </Chipster>
  )
}
```

## Styling

Chipster supports custom styling through className props and theme variants:

```tsx
// Basic styling with overrides
<Chipster.ItemList 
  className="flex flex-wrap gap-2"
  itemClassName="!bg-blue-100 !px-3 !py-1" // Use ! to override defaults
  removeButtonClassName="!text-red-500"
/>

// Dark theme with custom styles
<Chipster theme="dark">
  <Chipster.ItemList 
    itemClassName="!bg-gray-800 !text-white"
    removeButtonClassName="!text-gray-400"
  />
</Chipster>
```

## Keyboard Navigation

- `ArrowLeft/Right`: Navigate between chips when input is empty
- `Backspace`: Remove highlighted chip or last chip when input is empty
- `ArrowUp/Down`: Navigate through suggestions
- `Enter`: Select highlighted suggestion
- `Escape`: Clear suggestions and chip highlight

## Documentation

For complete documentation and examples, visit [chipster.micoblanc.me/start](https://chipster.micoblanc.me/start)

## License

MIT © [Alvaro Gallego De Paz]
