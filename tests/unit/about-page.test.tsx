import { render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';

import AboutPage from '@/app/about/page';

describe('About Page — Founder Name (US-009-01)', () => {
  test('renders founder full name "Mari Kriss C. Aseniero"', () => {
    render(<AboutPage />);
    expect(screen.getByText('Mari Kriss C. Aseniero')).toBeInTheDocument();
  });

  test('does not render incomplete founder name "Kriss Aseniero" without full name prefix', () => {
    render(<AboutPage />);
    const nodes = screen.queryAllByText((_content, element) => {
      const text = element?.textContent ?? '';
      return (
        text.includes('Kriss Aseniero') &&
        !text.includes('Mari Kriss C. Aseniero')
      );
    });
    expect(nodes).toHaveLength(0);
  });

  test('does not render old founder name "Kriss Judd"', () => {
    render(<AboutPage />);
    expect(screen.queryByText('Kriss Judd')).not.toBeInTheDocument();
  });
});
