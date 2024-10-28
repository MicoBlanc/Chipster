import { renderHook, } from '@testing-library/react';
import { act } from 'react';
import { useChipster } from '../useChipster';
import { ValidationRule } from '../types';

describe('useChipster', () => {
  it('initializes with default values', () => {
    const { result } = renderHook(() => useChipster());
    
    expect(result.current.items).toEqual([]);
    expect(result.current.error).toBeNull();
  });

  it('initializes with default items', () => {
    const defaultValue = ['item1', 'item2'];
    const { result } = renderHook(() => useChipster({ defaultValue }));
    
    expect(result.current.items.map(i => i.text)).toEqual(defaultValue);
  });

  it('adds items successfully', () => {
    const { result } = renderHook(() => useChipster());
    
    act(() => {
      result.current.addItem('test item');
    });
    
    expect(result.current.items[0].text).toBe('test item');
  });

  it('removes items by id', () => {
    const { result } = renderHook(() => useChipster({ defaultValue: ['test'] }));
    const itemId = result.current.items[0].id;
    
    act(() => {
      result.current.removeItem(itemId);
    });
    
    expect(result.current.items).toHaveLength(0);
  });

  it('handles validation rules', () => {
    const validationRules: ValidationRule[] = [{
      test: (value) => value.length >= 3,
      message: 'Too short'
    }];
    
    const { result } = renderHook(() => 
      useChipster({ validationRules, showErrorMessage: true })
    );
    
    act(() => {
      result.current.addItem('ab');
    });
    
    expect(result.current.error).toBe('Too short');
    expect(result.current.items).toHaveLength(0);
  });

  it('handles suggestions', () => {
    const getSuggestions = (input: string) => 
      ['apple', 'banana'].filter(s => s.includes(input));
    
    const { result } = renderHook(() => useChipster({ getSuggestions }));
    
    act(() => {
      result.current.updateSuggestions('a');
    });
    
    expect(result.current.suggestions).toEqual(['apple', 'banana']);
    expect(result.current.showSuggestions).toBe(true);
  });

  it('transforms input when transform option is provided', () => {
    const transform = (value: string) => value.toUpperCase();
    const { result } = renderHook(() => useChipster({ transform }));
    
    act(() => {
      result.current.addItem('test');
    });
    
    expect(result.current.items[0].text).toBe('TEST');
  });

  it('clears validation error', () => {
    const { result } = renderHook(() => useChipster({ maxItems: 1 }));
    
    act(() => {
      result.current.addItem('item1');
      result.current.addItem('item2'); // This should trigger error
      result.current.clearValidation();
    });
    
    expect(result.current.error).toBeNull();
  });
});