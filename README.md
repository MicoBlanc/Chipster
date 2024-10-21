# Chipster - A Flexible Multi-Entry Input Component for React

![chipster1](https://github.com/user-attachments/assets/7f7f09be-6e80-4d0e-81f5-fb395a92a0ff)

Chipster is a highly customizable React component that simplifies the management of multiple input entries. Perfect for tags, email addresses, or any list-based input scenario.


## Key Features:

- **Dynamic Input Handling**: Easily add and remove multiple entries
- **Customizable Validation**: Apply your own validation rules
- **Autocomplete Suggestions**: Enhance user experience with smart suggestions
- **Flexible Styling**: Fully customizable to match your design system
- **Accessibility-Focused**: Built with keyboard navigation and screen readers in mind
- **Animation Support**: Smooth entry and exit animations for a polished feel

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
