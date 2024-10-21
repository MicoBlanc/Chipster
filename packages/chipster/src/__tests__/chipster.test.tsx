import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Chipster } from '../chipster';
import '@testing-library/jest-dom';


describe('Chipster', () => {
  it('renders with placeholder', () => {
    render(<Chipster placeholder="Enter items" />);
    expect(screen.getByPlaceholderText('Enter items')).toBeInTheDocument();
  });

  it('adds items when Enter is pressed', () => {
    const onAdd = jest.fn();
    render(<Chipster onAdd={onAdd} />);
    
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'New Item' } });
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });

    expect(screen.getByText('New Item')).toBeInTheDocument();
    expect(onAdd).toHaveBeenCalledWith('New Item');
  });

  it('removes items when remove button is clicked', () => {
    const onRemove = jest.fn();
    render(<Chipster onRemove={onRemove} />);
    
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'Test Item' } });
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });

    const removeButton = screen.getByText('×');
    fireEvent.click(removeButton);

    expect(screen.queryByText('Test Item')).not.toBeInTheDocument();
    expect(onRemove).toHaveBeenCalled();
  });

  it('disables input when disabled prop is true', () => {
    render(<Chipster disabled={true} />);
    expect(screen.getByRole('textbox')).toBeDisabled();
  });

  it('shows error message when validation fails', () => {
    const validationRules = [
      { test: (value: string) => value.length > 2, message: 'Must be longer than 2 characters' }
    ];
    render(<Chipster validationRules={validationRules} />);
    
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'ab' } });
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });

    expect(screen.getByText('Must be longer than 2 characters')).toBeInTheDocument();
  });
});