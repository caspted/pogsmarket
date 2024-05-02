import React from 'react';
import { render, screen } from '@testing-library/react';
import {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
} from '../components/ui/card'

describe('Card', () => {
  test('renders with correct styles', () => {
    render(<Card>I am the Joker</Card>);

    const card = screen.getByText('I am the Joker');

    expect(card).toHaveClass('rounded-lg');
    expect(card).toHaveClass('border');
    expect(card).toHaveClass('bg-card');
    expect(card).toHaveClass('text-card-foreground');
    expect(card).toHaveClass('shadow-sm');
  });
});

describe('CardHeader', () => {
  test('renders with correct styles', () => {
    render(<CardHeader>Why so Serious?</CardHeader>);

    const cardHeader = screen.getByText('Why so Serious?');

    expect(cardHeader).toHaveClass('flex');
    expect(cardHeader).toHaveClass('flex-col');
    expect(cardHeader).toHaveClass('space-y-1.5');
    expect(cardHeader).toHaveClass('p-6');
  });
});

describe('CardFooter', () => {
  test('renders with correct styles', () => {
    render(<CardFooter>Let us play a game</CardFooter>);

    const cardFooter = screen.getByText('Let us play a game');

    expect(cardFooter).toHaveClass('flex');
    expect(cardFooter).toHaveClass('items-center');
    expect(cardFooter).toHaveClass('p-6');
  });
});

describe('CardTitle', () => {
  test('renders with correct styles', () => {
    render(<CardTitle>Title Please</CardTitle>);

    const cardTitle = screen.getByText('Title Please');

    expect(cardTitle).toHaveClass('text-2xl');
    expect(cardTitle).toHaveClass('font-semibold');
    expect(cardTitle).toHaveClass('leading-none');
    expect(cardTitle).toHaveClass('tracking-tight');
  });
});

describe('CardDescription', () => {
  test('renders with correct styles', () => {
    render(<CardDescription>Come and give me a Description</CardDescription>);

    const cardDescription = screen.getByText('Come and give me a Description');
    expect(cardDescription).toHaveClass('text-sm');
    expect(cardDescription).toHaveClass('text-muted-foreground');
  });
});

describe('CardContent', () => {
  test('renders with correct styles', () => {
    render(<CardContent>Content is for Losers</CardContent>);

    const cardContent = screen.getByText('Content is for Losers');

    expect(cardContent).toHaveClass('p-6');
    expect(cardContent).toHaveClass('pt-0');
  });
});
