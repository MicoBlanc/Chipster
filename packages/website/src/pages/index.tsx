import { Chipster } from 'chipster';
import { ValidationRule } from 'chipster';

export default function Home() {
  const validationRules: ValidationRule[] = [
    { test: (value: string) => value.length >= 3, message: 'Must be at least 3 characters' },
    { test: (value: string) => value.length <= 50, message: 'Must not exceed 50 characters' },
  ];

  const transform = (value: string) => value.trim().toLowerCase();

  return (
    <div className='bg-gray-100 flex items-center justify-center w-full h-screen'>
      <div className="p-4 bg-gray-100 w-full max-w-xl">
        <Chipster
        className='bg-red-500 text-black'
          onAdd={(value) => console.log('Added:', value)}
          onRemove={(id) => console.log('Removed item with id:', id)}
          placeholder="Add items..."
          exitAnimation="fadeSlideLeft"
          validationRules={validationRules}
          maxItems={10}
          allowDuplicates={false}
          caseSensitive={false}
          transform={transform}
          showErrorMessage={true}
        />
      </div>
    </div>
  );
}