import { render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';

import { CtaBanner } from '@/components/sections/cta-banner';

describe('CtaBanner — Phone Number Regression (US-005-02)', () => {
  test('AC-005-07: displays correct phone number +1 (808) 200-1840', () => {
    render(<CtaBanner />);
    expect(screen.getByText('+1 (808) 200-1840')).toBeInTheDocument();
  });

  test('AC-005-08: old placeholder +1 (800) 888-8888 is NOT present', () => {
    render(<CtaBanner />);
    const body = document.body.textContent ?? '';
    expect(body).not.toContain('+1 (800) 888-8888');
    expect(body).not.toContain('(800) 888-8888');
  });

  test('AC-005-09: tel: link has href="tel:+18082001840"', () => {
    render(<CtaBanner />);
    const phoneLink = screen.getByRole('link', { name: /808.*200.*1840/ });
    expect(phoneLink).toHaveAttribute('href', 'tel:+18082001840');
  });

  test('AC-005-09: old tel href +18008888888 is NOT present', () => {
    render(<CtaBanner />);
    const oldLink = screen.queryByRole('link', { name: /800.*888.*8888/ });
    expect(oldLink).toBeNull();
  });
});
