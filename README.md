# Chipster - A Composable Input Component for Managing Multiple Entries

![chipster1](https://github.com/user-attachments/assets/7f7f09be-6e80-4d0e-81f5-fb395a92a0ff)

Chipster is a **flexible, customizable input component** that allows users to input **multiple entries** (emails, tags, etc.) as removable badges. This component addresses key input management challenges by offering:

- **Input Flexibility**: Add multiple inputs fluidly without cluttering the UI.
- **Badge Management**: Easily manage removable badges.
- **Custom Validation**: Developers can add validation logic (e.g., for email or phone number formats).
- **Accessibility**: Supports keyboard navigation and validation messages.
- **Composable**: Badge components can be swapped for custom designs.
- **Style Customization**: Compatible with Tailwind and custom CSS frameworks.
---

### Installation

Install Chipster via npm:

```bash
npm install @micoblanc/chipster
```

### Basic Usage

Import and use the Chipster component in your React application:

```jsx
import React from 'react';
import { Chipster } from '@micoblanc/chipster';

function App() {
  return (
    <Chipster
      placeholder="Enter tags..."
      allowDuplicates={false}
      showErrorMessage={true}
      validationRules={[
        (value) => value.length > 2 || 'Tag must be longer than 2 characters',
      ]}
      maxItems={5}
      onAdd={(item) => console.log('Added:', item)}
      onRemove={(item) => console.log('Removed:', item)}
    />
  );
}
```

#### Props:

- `placeholder`: Set custom placeholder text (string or JSX)
- `allowDuplicates`: Allow or prevent duplicate entries (boolean)
- `showErrorMessage`: Display validation error messages (boolean)
- `validationRules`: Array of functions for input validation
- `maxItems`: Set maximum number of items allowed
- `onAdd`: Callback function when an item is added
- `onRemove`: Callback function when an item is removed

### Suggestions (Autocomplete)

Enable autocomplete suggestions:

```jsx
import React from 'react';
import { Chipster } from '@micoblanc/chipster';

const suggestions = ['apple', 'banana', 'cherry', 'date', 'elderberry'];

function App() {
  return (
    <Chipster
      placeholder="Enter fruits..."
      getSuggestions={(input) => 
        suggestions.filter(item => 
          item.toLowerCase().includes(input.toLowerCase())
        )
      }
    />
  );
}
```

The `getSuggestions` prop accepts a function that returns an array of suggestions based on the current input.

### Styling

Chipster supports custom styling through className props:

```jsx
<Chipster
  className="custom-container"
  inputClassName="custom-input"
  errorClassName="custom-error"
  chipClassName="custom-chip"
  chipHighlightedClassName="custom-chip-highlighted"
  chipDisabledClassName="custom-chip-disabled"
  chipIconClassName="custom-chip-icon"
  chipRemoveButtonClassName="custom-chip-remove-button"
  exitAnimation="fade" // or 'slide' or custom animation object
/>
```

#### Animation

Use built-in animations or define custom ones:

```jsx
// Built-in animation
<Chipster exitAnimation="fade" />

// Custom animation
<Chipster
  exitAnimation={{
    exit: {
      duration: 300,
      easing: 'ease-out',
      properties: {
        opacity: 0,
        transform: 'scale(0.8)',
      },
    },
  }}
/>
```

For more advanced usage and full API documentation, please refer to our API Documentation **(work in progress)**
