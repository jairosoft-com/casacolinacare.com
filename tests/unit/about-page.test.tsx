import { render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';

import AboutPage from '@/app/about/page';

describe('About Page — Founder Name (US-006-01)', () => {
  test('renders correct founder name "Kriss Aseniero"', () => {
    render(<AboutPage />);
    expect(screen.getByText('Kriss Aseniero')).toBeInTheDocument();
  });

  test('does not render old founder name "Kriss Judd"', () => {
    render(<AboutPage />);
    expect(screen.queryByText('Kriss Judd')).not.toBeInTheDocument();
  });
});
