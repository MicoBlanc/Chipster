import { renderHook, act } from '@testing-library/react'
import { useChipster } from '../useChipster';

describe('useChipster', () => {
  it('should add an item', () => {
    const { result } = renderHook(() => useChipster());

    act(() => {
      result.current.addItem('Test Item');
    });

    expect(result.current.items).toHaveLength(1);
    expect(result.current.items[0].text).toBe('Test Item');
  });

  it('should remove an item', () => {
    const { result } = renderHook(() => useChipster());

    act(() => {
      result.current.addItem('Test Item');
    });

    const itemId = result.current.items[0].id;

    act(() => {
      result.current.removeItem(itemId);
    });

    expect(result.current.items).toHaveLength(0);
  });

  it('should highlight an item', () => {
    const { result } = renderHook(() => useChipster());

    act(() => {
      result.current.addItem('Test Item');
      result.current.highlightItem(0);
    });

    expect(result.current.highlightedIndex).toBe(0);
  });

  it('should clear validation', () => {
    const { result } = renderHook(() => useChipster());

    act(() => {
      result.current.validateInput('');
      result.current.clearValidation();
    });

    expect(result.current.error).toBeNull();
  });

  it('should update suggestions', () => {
    const mockGetSuggestions = jest.fn().mockReturnValue(['suggestion1', 'suggestion2']);
    const { result } = renderHook(() => useChipster({ getSuggestions: mockGetSuggestions }));

    act(() => {
      result.current.updateSuggestions('test');
    });

    expect(result.current.suggestions).toEqual(['suggestion1', 'suggestion2']);
    expect(result.current.showSuggestions).toBe(true);
  });

  it('should clear suggestions', () => {
    const { result } = renderHook(() => useChipster());

    act(() => {
      result.current.updateSuggestions('test');
      result.current.clearSuggestions();
    });

    expect(result.current.suggestions).toEqual([]);
    expect(result.current.showSuggestions).toBe(false);
  });
});
