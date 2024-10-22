import { Chipster } from 'chipster';
import { ValidationRule } from 'chipster';
import { useState, useCallback } from 'react';
import { ChipsterItem as OriginalChipsterItem } from 'chipster';
import DemoFruit from '@/components/demoFruit';
import DemoEmailShare from '@/components/demoEmailShare';
import DemoContentTags from '@/components/demoContentTags';

interface CustomChipsterItem extends OriginalChipsterItem {
  icon?: React.ReactNode;
}

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
];

export default function Home() {

  return (
    <div className='bg-gray-100 font-sans flex items-center justify-center w-full h-screen'>
      
      <div className='bg-red-500 w-full h-full flex flex-col'>
        <DemoFruit />
        <DemoContentTags />
        <DemoEmailShare />
      </div>
     
    </div>
  );
}
