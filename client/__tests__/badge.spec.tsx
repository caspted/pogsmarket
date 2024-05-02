import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Badge} from '../components/ui/badge'; 

describe('Badge', () => {
  test('renders with default variant', () => {
    render(<Badge>Default Badge</Badge>);

    const badge = screen.getByText('Default Badge');

    // for our default styles 
    expect(badge).toHaveClass('bg-primary');
    expect(badge).toHaveClass('text-primary-foreground');
    expect(badge).toHaveClass('border-transparent');
  });

  test('renders with secondary variant', () => {
    render(<Badge variant="secondary">Secondary Badge</Badge>);

    const badge = screen.getByText('Secondary Badge');

    // this is for the secondary styles if they are visisble
    expect(badge).toHaveClass('bg-secondary');
    expect(badge).toHaveClass('text-secondary-foreground');
    expect(badge).toHaveClass('border-transparent');
  });

  test('renders with destructive variant', () => {
    render(<Badge variant="destructive">Destructive Badge</Badge>);

    const badge = screen.getByText('Destructive Badge');

    // checking if the destructive styles is good
    expect(badge).toHaveClass('bg-destructive');
    expect(badge).toHaveClass('text-destructive-foreground');
    expect(badge).toHaveClass('border-transparent');
  });

  test('renders with outline variant', () => {
    render(<Badge variant="outline">Outline Badge</Badge>);

    const badge = screen.getByText('Outline Badge');

    // checking the styles
    expect(badge).toHaveClass('text-foreground');
    expect(badge).not.toHaveClass('bg-primary');
    expect(badge).not.toHaveClass('bg-secondary');
    expect(badge).not.toHaveClass('bg-destructive');
  });
  test('passes additional props to the badge', () => {
    const handleClick = jest.fn();
    render(
      <Badge onClick={handleClick} data-testid="custom-badge">
        Custom Badge
      </Badge>
    );
  
    const badge = screen.getByTestId('custom-badge');
  
    // The custom props are passed to the badge
    expect(badge).toBeInTheDocument();
  
    // We need to simulate a click on the badge
    fireEvent.click(badge);
  
    // calling the clicker function 
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
  
});
