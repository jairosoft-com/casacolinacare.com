import { render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';

import { Footer } from '@/components/layout/footer';

describe('Footer Logo — Font Consistency (US-008-02)', () => {
  test('TEST-008-02: footer logo h3 has font-heading class', () => {
    render(<Footer />);
    const heading = screen.getByRole('heading', { name: /casa colina care/i });
    expect(heading).toHaveClass('font-heading');
  });

  test('TEST-008-02a: footer logo retains font-bold and tracking-tight', () => {
    render(<Footer />);
    const heading = screen.getByRole('heading', { name: /casa colina care/i });
    expect(heading).toHaveClass('font-bold');
    expect(heading).toHaveClass('tracking-tight');
  });
});
