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

describe('About Page — Lead Nurse Card (AB#206841)', () => {
  test('AC-1: renders "Aileen Jordan, RN" as middle card name', () => {
    render(<AboutPage />);
    expect(screen.getByText('Aileen Jordan, RN')).toBeInTheDocument();
  });

  test('AC-2: renders "Registered Nurse" as middle card title', () => {
    render(<AboutPage />);
    expect(screen.getByText('Registered Nurse')).toBeInTheDocument();
  });

  test('AC-3: bio text is unchanged', () => {
    render(<AboutPage />);
    expect(
      screen.getByText(/our lead caregiver brings compassion/i),
    ).toBeInTheDocument();
  });

  test('AC-7: does not render old role "Lead Caregiver" (regression guard)', () => {
    render(<AboutPage />);
    expect(screen.queryByText('Lead Caregiver')).not.toBeInTheDocument();
  });

  test('AC-7: "Aileen Jordan, RN" heading exists; no heading named "Care Team Member" for the nurse role', () => {
    render(<AboutPage />);
    expect(
      screen.getByRole('heading', { level: 3, name: 'Aileen Jordan, RN' }),
    ).toBeInTheDocument();
  });
});

describe('About Page — CNA Card (AB#206950)', () => {
  test('AC-1: renders "Nieves Esperanza, CNA" as 3rd card heading', () => {
    render(<AboutPage />);
    expect(
      screen.getByRole('heading', { level: 3, name: 'Nieves Esperanza, CNA' }),
    ).toBeInTheDocument();
  });

  test('AC-1: renders "Certified Nursing Assistant" as 3rd card role', () => {
    render(<AboutPage />);
    expect(screen.getByText('Certified Nursing Assistant')).toBeInTheDocument();
  });

  test('AC-2: does not render old name "Care Team Member" (regression guard)', () => {
    render(<AboutPage />);
    expect(screen.queryByText('Care Team Member')).not.toBeInTheDocument();
  });

  test('AC-2: does not render old role "Activities Coordinator" (regression guard)', () => {
    render(<AboutPage />);
    expect(
      screen.queryByText('Activities Coordinator'),
    ).not.toBeInTheDocument();
  });
});
