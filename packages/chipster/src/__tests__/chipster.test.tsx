import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Chipster } from '../chipster';
import { ValidationRule } from '../types';

describe('Chipster', () => {
  const defaultProps = {
    onAdd: jest.fn(),
    onRemove: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders with placeholder', () => {
    render(<Chipster {...defaultProps} placeholder="Test placeholder" />);
    expect(screen.getByPlaceholderText('Test placeholder')).toBeInTheDocument();
  });

  it('adds chip when typing and pressing enter', async () => {
    render(<Chipster {...defaultProps} />);


    const input = screen.getByRole('textbox');
    
    await userEvent.type(input, 'test chip{enter}');
    
    expect(screen.getByText('test chip')).toBeInTheDocument();
    expect(defaultProps.onAdd).toHaveBeenCalledWith('test chip');
  });

  it('removes chip when clicking remove button', async () => {
    render(<Chipster {...defaultProps} defaultValue={['initial chip']} />);
    
    const removeButton = screen.getByRole('button');
    await userEvent.click(removeButton);
    
    expect(screen.queryByText('initial chip')).not.toBeInTheDocument();
    expect(defaultProps.onRemove).toHaveBeenCalled();
  });

  it('shows validation error for invalid input', async () => {
    const validationRules: ValidationRule[] = [{
      test: (value: string) => value.length > 5,
      message: 'Too short'
    }];

    render(<Chipster {...defaultProps} validationRules={validationRules} />);
    const input = screen.getByRole('textbox');
    
    await userEvent.type(input, 'test{enter}');
    
    expect(screen.getByText('Too short')).toBeInTheDocument();
    expect(defaultProps.onAdd).not.toHaveBeenCalled();
  });

  it('handles suggestions correctly', async () => {
    const getSuggestions = (input: string) => 
      ['apple', 'banana', 'cherry'].filter(s => s.includes(input));

    render(<Chipster {...defaultProps} getSuggestions={getSuggestions} />);
    const input = screen.getByRole('textbox');
    
    await userEvent.type(input, 'a');
    
    expect(screen.getByText('apple')).toBeInTheDocument();
    expect(screen.getByText('banana')).toBeInTheDocument();
    expect(screen.queryByText('cherry')).not.toBeInTheDocument();
  });

  it('disables input when disabled prop is true', () => {
    render(<Chipster {...defaultProps} disabled />);
    expect(screen.getByRole('textbox')).toBeDisabled();
  });

  it('prevents duplicates when allowDuplicates is false', async () => {
    render(<Chipster {...defaultProps} allowDuplicates={false} />);
    const input = screen.getByRole('textbox');
    
    await userEvent.type(input, 'test{enter}');
    await userEvent.type(input, 'test{enter}');
    
    const chips = screen.getAllByText('test');
    expect(chips).toHaveLength(1);
  });
});
