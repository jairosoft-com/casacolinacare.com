import { render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';

import { Header } from '@/components/layout/header';

describe('Header Logo — Font Update (US-008-01)', () => {
  test('TEST-008-01: header logo has font-heading class', () => {
    render(<Header />);
    const logo = screen.getByRole('link', { name: /casa colina care/i });
    expect(logo).toHaveClass('font-heading');
  });

  test('TEST-008-01a: header logo retains font-bold and tracking-tight', () => {
    render(<Header />);
    const logo = screen.getByRole('link', { name: /casa colina care/i });
    expect(logo).toHaveClass('font-bold');
    expect(logo).toHaveClass('tracking-tight');
  });

  test('TEST-008-01b: header logo links to home page', () => {
    render(<Header />);
    const logo = screen.getByRole('link', { name: /casa colina care/i });
    expect(logo).toHaveAttribute('href', '/');
  });
});
