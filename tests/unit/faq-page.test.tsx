import { describe, expect, test } from 'vitest';

import { faqCategories } from '@/lib/faq-data';

describe('FAQ Page — Location & Phone Updates (US-004)', () => {
  const allAnswers = faqCategories.flatMap(cat =>
    cat.questions.map(q => q.answer),
  );

  test('TC-F01: location answer has correct address', () => {
    const locationAnswer = faqCategories
      .find(c => c.category === 'General')
      ?.questions.find(q =>
        q.question.includes('Where is Casa Colina Care located'),
      )?.answer;
    expect(locationAnswer).toContain(
      '189 Anapalau Street (Hawaii Kai), Honolulu, HI 96825',
    );
  });

  test('TC-F02: admissions answer has correct phone', () => {
    const admissionsAnswer = faqCategories
      .find(c => c.category === 'Admissions & Getting Started')
      ?.questions.find(q =>
        q.question.includes('How do I begin the admissions process'),
      )?.answer;
    expect(admissionsAnswer).toContain('+1 (808) 200-1840');
  });

  test('TC-F03: marketing Hawaii Kai references are preserved', () => {
    const generalAnswer = faqCategories
      .find(c => c.category === 'General')
      ?.questions.find(q => q.question.includes('What type of care'))?.answer;
    expect(generalAnswer).toContain('family-style setting in Hawaii Kai');
  });

  test('TC-F04: old placeholder phone does not appear in any answer', () => {
    const allText = allAnswers.join(' ');
    expect(allText).not.toContain('(800) 888-8888');
  });

  test('TC-F05: old misspelled street does not appear in any answer', () => {
    const allText = allAnswers.join(' ');
    expect(allText).not.toContain('Anapalua');
  });
});
