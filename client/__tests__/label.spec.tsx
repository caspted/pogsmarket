import React from 'react';
import { render } from '@testing-library/react';
import { Label } from '../components/ui/label'

describe('Label component', () => {
  test('should render label text', () => {
    const labelText = 'Email';
    const { getByText } = render(<Label>{labelText}</Label>);
    expect(getByText(labelText)).toBeInTheDocument();
  });

  test('should apply the right className', () => {
    const { container } = render(<Label className="custom-class">Label Text</Label>);
    expect(container.firstChild).toHaveClass('custom-class');
  });

  test('should forwards reference to underlying element', () => {
    const ref = React.createRef<HTMLLabelElement>();
    render(<Label ref={ref}>Label Text</Label>);
    expect(ref.current).toBeInTheDocument();
  });

  test('should associate with the form input via htmlFor prop', () => {
    const inputId = 'email-input';
    const { container } = render(
      <>
        <Label htmlFor={inputId}>Email</Label>
        <input id={inputId} />
      </>
    );
    expect(container.querySelector('label')).toHaveAttribute('for', inputId);
  });

});
