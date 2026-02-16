import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, test } from 'vitest';

import ContactPage from '@/app/contact/page';

describe('Contact Page — Phone, Fax, and Address (US-002)', () => {
  beforeEach(() => {
    render(<ContactPage />);
  });

  test('TC-004: phone link href is tel:+18082001840', () => {
    const phoneLink = screen.getByRole('link', { name: /808.*200.*1840/ });
    expect(phoneLink).toHaveAttribute('href', 'tel:+18082001840');
  });

  test('TC-005: fax renders as plain text, not a link', () => {
    const faxNumber = screen.getByText('+1 (808) 670-1163');
    expect(faxNumber).toBeInTheDocument();
    expect(faxNumber.tagName).toBe('P');
    expect(faxNumber.closest('a')).toBeNull();
  });

  test('TC-006: fax is positioned between phone and email blocks', () => {
    const allLabels = screen.getAllByText(/^(Phone|Fax|Email)$/);
    const labelTexts = allLabels.map(el => el.textContent);
    const phoneIdx = labelTexts.indexOf('Phone');
    const faxIdx = labelTexts.indexOf('Fax');
    const emailIdx = labelTexts.indexOf('Email');
    expect(faxIdx).toBeGreaterThan(phoneIdx);
    expect(faxIdx).toBeLessThan(emailIdx);
  });

  test('TC-007: street displays with neighborhood label', () => {
    expect(
      screen.getByText(/189 Anapalau Street \(Hawaii Kai\)/),
    ).toBeInTheDocument();
  });

  test('TC-008: city displays as Honolulu', () => {
    expect(screen.getByText(/Honolulu, HI 96825/)).toBeInTheDocument();
  });

  test('TC-009: old placeholder phone does not appear', () => {
    const body = document.body.textContent ?? '';
    expect(body).not.toContain('(800) 888-8888');
    expect(body).not.toContain('+18008888888');
  });
});
