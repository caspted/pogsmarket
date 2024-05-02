import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from '../components/ui/button'

describe('Button', () => {
  test('renders with default variant and size', () => {
    render(<Button>Default Button</Button>);

    const button = screen.getByText('Default Button');

    expect(button).toHaveClass('bg-primary');
    expect(button).toHaveClass('text-primary-foreground');
    expect(button).toHaveClass('h-10');
    expect(button).toHaveClass('px-4');
    expect(button).toHaveClass('py-2');
    expect(button).toBeEnabled();
    expect(button.tagName).toBe('BUTTON') // We need to make this test to ensure that this is a button element
  });

  test('renders with custom variant and size', () => {
    render(
      <Button variant="outline" size="lg">
        Large Outline Button
      </Button>
    );

    const button = screen.getByText('Large Outline Button');

    expect(button).toHaveClass('border');
    expect(button).toHaveClass('border-input');
    expect(button).toHaveClass('bg-background');
    expect(button).toHaveClass('h-11');
    expect(button).toHaveClass('px-8');
    expect(button).toBeEnabled();
    expect(button.tagName).toBe('BUTTON') 
  });

  test('renders as slot when asChild prop is true', () => {
    render(
      <Button asChild variant="ghost" size="sm">
        <div data-testid="button-content">Slot Button</div>
      </Button>
    );

    const button = screen.getByTestId('button-content');

    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('hover:bg-accent');
    expect(button).toHaveClass('hover:text-accent-foreground');
    expect(button).toHaveClass('h-9');
    expect(button).toHaveClass('rounded-md');
    expect(button).toHaveClass('px-3');
  });

  test('triggers onClick handler when clicked', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click Me</Button>);

    const button = screen.getByText('Click Me');

    fireEvent.click(button);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
