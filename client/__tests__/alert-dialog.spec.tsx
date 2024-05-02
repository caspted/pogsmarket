import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
} from '../components/ui/alert-dialog'

describe('AlertDialog', () => {
  test('renders dialog content when trigger is clicked', () => {
    render(
      <AlertDialog>
        <AlertDialogTrigger>Open Dialog</AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Dialog Title</AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogDescription>
            This is the dialog description.
          </AlertDialogDescription>
          <AlertDialogFooter>
            <AlertDialogAction>Confirm</AlertDialogAction>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );

    // By default, dialog content should not be visible
    expect(screen.queryByText('Dialog Title')).toBeNull();

    // Click the trigger to open the dialog
    fireEvent.click(screen.getByText('Open Dialog'));

    // After clicking the trigger, dialog content should be visible
    expect(screen.getByText('Dialog Title')).toBeInTheDocument();
    expect(screen.getByText('This is the dialog description.')).toBeInTheDocument();

    // Confirm and cancel buttons should be present
    expect(screen.getByText('Confirm')).toBeInTheDocument();
    expect(screen.getByText('Cancel')).toBeInTheDocument();
  });

  test('confirms action when Confirm button is clicked', () => {
    const mockConfirmAction = jest.fn();
    render(
      <AlertDialog>
        <AlertDialogTrigger>Open Dialog</AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogAction onClick={mockConfirmAction}>Confirm</AlertDialogAction>
        </AlertDialogContent>
      </AlertDialog>
    );

    // Click the trigger to open the dialog
    fireEvent.click(screen.getByText('Open Dialog'));

    // Click the Confirm button
    fireEvent.click(screen.getByText('Confirm'));

    // Confirm action should be called
    expect(mockConfirmAction).toHaveBeenCalledTimes(1);
  });

  test('closes dialog when Cancel button is clicked', () => {
    render(
      <AlertDialog>
        <AlertDialogTrigger>Open Dialog</AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
        </AlertDialogContent>
      </AlertDialog>
    );

    // Click the trigger to open the dialog
    fireEvent.click(screen.getByText('Open Dialog'));

    // Click the Cancel button
    fireEvent.click(screen.getByText('Cancel'));

    // Dialog content should be closed
    expect(screen.queryByText('Cancel')).toBeNull();
  });
});