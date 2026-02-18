import { render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';

import { Footer } from '@/components/layout/footer';

describe('Footer — Phone, Fax, and Address (US-003)', () => {
  test('TC-018: phone link href is tel:+18082001840', () => {
    render(<Footer />);
    const phoneLink = screen.getByRole('link', { name: /808.*200.*1840/ });
    expect(phoneLink).toHaveAttribute('href', 'tel:+18082001840');
  });

  test('TC-019: phone display text is correct', () => {
    render(<Footer />);
    expect(screen.getByText('+1 (808) 200-1840')).toBeInTheDocument();
  });

  test('TC-020: fax entry exists with correct number', () => {
    render(<Footer />);
    expect(screen.getByText(/670-1163/)).toBeInTheDocument();
  });

  test('TC-021: fax is plain text, not a link', () => {
    render(<Footer />);
    const faxLink = screen.queryByRole('link', { name: /670-1163/ });
    expect(faxLink).toBeNull();
  });

  test('TC-022: fax label says "Fax:"', () => {
    render(<Footer />);
    expect(screen.getByText('Fax:')).toBeInTheDocument();
  });

  test('TC-023: street displays 189 Anapalau Street (Hawaii Kai)', () => {
    render(<Footer />);
    expect(
      screen.getByText('189 Anapalau Street (Hawaii Kai)'),
    ).toBeInTheDocument();
  });

  test('TC-024: city displays Honolulu, HI 96825', () => {
    render(<Footer />);
    expect(screen.getByText('Honolulu, HI 96825')).toBeInTheDocument();
  });

  test('TC-025: old phone number does not exist', () => {
    render(<Footer />);
    const body = document.body.textContent ?? '';
    expect(body).not.toContain('(800) 888-8888');
    expect(body).not.toContain('+18008888888');
  });

  test('TC-026: old street spelling does not exist', () => {
    render(<Footer />);
    const body = document.body.textContent ?? '';
    expect(body).not.toContain('Anapalua');
  });

  test('TC-027: old city "Hawaii Kai, HI 96825" does not exist', () => {
    render(<Footer />);
    const body = document.body.textContent ?? '';
    expect(body).not.toContain('Hawaii Kai, HI 96825');
  });
});
