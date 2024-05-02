import React from 'react';
import { render, screen } from '@testing-library/react';
import {
  Dialog,
  DialogOverlay,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from '../components/ui/dialog'

describe('Dialog', () => {
  test('renders with the text', () => {
    render(<Dialog>Time is short but meaningful</Dialog>);

    const dialog = screen.getByText('Time is short but meaningful');
    expect(dialog).toBeInTheDocument();

  });
});

describe('DialogOverlay', () => {
  test('will be rendered', () => {
    render(<Dialog><DialogOverlay /></Dialog>);
  });
});

describe('DialogContent', () => {
  test('will be rendered', () => {
    render(
      <Dialog>
        <DialogContent>
          <div>Not this time</div>
        </DialogContent>
    </Dialog>
    );

  });
});

describe('DialogHeader', () => {
  test('renders with its styles and content', () => {
    render(<DialogHeader>The highest point</DialogHeader>);

    const dialogHeader = screen.getByText('The highest point');
    expect(dialogHeader).toHaveClass('flex');
    expect(dialogHeader).toHaveClass('flex-col');
    expect(dialogHeader).toHaveClass('space-y-1.5');
  });
});

describe('DialogFooter', () => {
  test('renders with its content', () => {
    render(<DialogFooter>The End</DialogFooter>);

    const dialogFooter = screen.getByText('The End');
    expect(dialogFooter).toBeInTheDocument();

  });
});

describe('DialogTitle', () => {
  test('renders with its correct styles', () => {
    render(
      <Dialog>
        <DialogTitle>Dune: The Spice Trade</DialogTitle>
      </Dialog>
    );

    const dialogTitle = screen.getByText('Dune: The Spice Trade');
    expect(dialogTitle).toHaveClass('text-lg');
    expect(dialogTitle).toHaveClass('font-semibold');
    expect(dialogTitle).toHaveClass('leading-none');
  });
});

describe('DialogDescription', () => {
  test('should render with its correct styles', () => {
    render(<Dialog>
      <DialogDescription>Hello There, General Kenobi</DialogDescription>
    </Dialog>
  );

    const dialogDescription = screen.getByText('Hello There, General Kenobi');
    expect(dialogDescription).toHaveClass('text-sm');
    expect(dialogDescription).toHaveClass('text-muted-foreground');

  });
});

describe('DialogClose', () => {
  test('will be rendered here', () => {
    render(<Dialog>
      <DialogClose />
    </Dialog>);
  });
});
