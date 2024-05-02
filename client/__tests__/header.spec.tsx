import React from 'react';
import { render, screen } from '@testing-library/react';
import Header from '../components/Header';

describe('Header', () => {
  test('renders header with correct links', () => {
    render(<Header />);

    expect(screen.getByText('PogChamp Market')).toBeInTheDocument();
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Admin Panel')).toBeInTheDocument();
    expect(screen.getByText('Owned Pogs')).toBeInTheDocument();
  });

});
