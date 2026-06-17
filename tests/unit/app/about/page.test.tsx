import { render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';

import AboutPage from '@/app/about/page';

describe('About Page — Founder Bio Nickname (US-010-01)', () => {
  test('AC-010-01: bio contains "Kriss" (nickname)', () => {
    render(<AboutPage />);
    const body = document.body.textContent ?? '';
    expect(body).toContain('Kriss');
  });

  test('AC-010-01: bio does not contain "Mari Kriss C. Aseniero" in prose', () => {
    render(<AboutPage />);
    const bioElements = screen.getAllByText(/kriss founded casa colina care/i);
    expect(bioElements.length).toBeGreaterThan(0);
    bioElements.forEach(el => {
      expect(el.textContent).not.toContain('Mari Kriss C. Aseniero');
    });
  });

  test('AC-010-02: team[0].name remains "Mari Kriss C. Aseniero"', () => {
    render(<AboutPage />);
    expect(screen.getByText('Mari Kriss C. Aseniero')).toBeInTheDocument();
  });
});
