/**
 * Property-Based Tests for Global Sequential Numbering of Acceptance Criteria
 * Feature: azure-sync-id-consistency
 * Task: 3.3 Write property test for global sequential numbering
 *
 * **Validates: Requirements 3.5**
 */

import * as fc from 'fast-check';
import { describe, expect, it } from 'vitest';

import { generateAcceptanceCriteriaId } from '@/lib/azure-sync/acceptance-criteria-id-generator';
import { parseAcceptanceCriteriaId } from '@/lib/azure-sync/acceptance-criteria-id-parser';

interface UserStory {
  id: string;
  acceptanceCriteria: string[];
}

/**
 * Generates Acceptance Criteria IDs for a set of user stories with global sequential numbering
 *
 * @param userStories - Array of user stories with acceptance criteria
 * @param featureNumber - 3-digit feature number
 * @returns Array of generated AC IDs
 */
function generateAcceptanceCriteriaIds(
  userStories: UserStory[],
  featureNumber: string,
): string[] {
  const ids: string[] = [];
  let globalSequence = 1;

  for (const story of userStories) {
    for (let i = 0; i < story.acceptanceCriteria.length; i++) {
      ids.push(generateAcceptanceCriteriaId(featureNumber, globalSequence));
      globalSequence++;
    }
  }

  return ids;
}

describe('Property 7: Global Sequential Numbering for Acceptance Criteria', () => {
  /**
   * Generator for valid feature numbers (001-999)
   */
  const featureNumberGenerator = () => {
    return fc
      .integer({ min: 1, max: 999 })
      .map(n => n.toString().padStart(3, '0'));
  };

  /**
   * Generator for user stories with acceptance criteria
   */
  const userStoryWithCriteriaGenerator = () => {
    return fc.record({
      id: fc
        .integer({ min: 1, max: 99 })
        .map(n => `US-001-${n.toString().padStart(2, '0')}`),
      acceptanceCriteria: fc.array(fc.string(), { minLength: 1, maxLength: 5 }),
    });
  };

  it('should increment sequence numbers globally across all user stories', () => {
    fc.assert(
      fc.property(
        fc.array(userStoryWithCriteriaGenerator(), {
          minLength: 1,
          maxLength: 10,
        }),
        featureNumberGenerator(),
        (userStories, featureNumber) => {
          const generatedIds = generateAcceptanceCriteriaIds(
            userStories,
            featureNumber,
          );

          // Verify global sequential numbering
          let expectedSequence = 1;
          for (const id of generatedIds) {
            const parsed = parseAcceptanceCriteriaId(id);
            expect(parsed.valid).toBe(true);
            expect(parsed.sequence).toBe(
              expectedSequence.toString().padStart(2, '0'),
            );
            expectedSequence++;
          }
        },
      ),
      { numRuns: 100 },
    );
  });

  it('should not reset sequence numbers between user stories', () => {
    fc.assert(
      fc.property(
        fc.array(userStoryWithCriteriaGenerator(), {
          minLength: 2,
          maxLength: 10,
        }),
        featureNumberGenerator(),
        (userStories, featureNumber) => {
          const generatedIds = generateAcceptanceCriteriaIds(
            userStories,
            featureNumber,
          );

          // Track sequences per user story
          let currentIndex = 0;
          let previousMaxSequence = 0;

          for (const story of userStories) {
            const storyIds = generatedIds.slice(
              currentIndex,
              currentIndex + story.acceptanceCriteria.length,
            );

            // Get the first sequence number for this story
            if (storyIds.length > 0) {
              const firstParsed = parseAcceptanceCriteriaId(storyIds[0]);
              const firstSequence = parseInt(firstParsed.sequence || '0', 10);

              // First sequence of this story should be greater than the last sequence of previous story
              expect(firstSequence).toBeGreaterThan(previousMaxSequence);

              // Update previous max sequence
              const lastParsed = parseAcceptanceCriteriaId(
                storyIds[storyIds.length - 1],
              );
              previousMaxSequence = parseInt(lastParsed.sequence || '0', 10);
            }

            currentIndex += story.acceptanceCriteria.length;
          }
        },
      ),
      { numRuns: 100 },
    );
  });

  it('should start from 01 for the first acceptance criterion', () => {
    fc.assert(
      fc.property(
        fc.array(userStoryWithCriteriaGenerator(), {
          minLength: 1,
          maxLength: 10,
        }),
        featureNumberGenerator(),
        (userStories, featureNumber) => {
          const generatedIds = generateAcceptanceCriteriaIds(
            userStories,
            featureNumber,
          );

          // First ID should have sequence 01
          if (generatedIds.length > 0) {
            const firstParsed = parseAcceptanceCriteriaId(generatedIds[0]);
            expect(firstParsed.sequence).toBe('01');
          }
        },
      ),
      { numRuns: 100 },
    );
  });

  it('should increment by 1 for each subsequent criterion', () => {
    fc.assert(
      fc.property(
        fc.array(userStoryWithCriteriaGenerator(), {
          minLength: 1,
          maxLength: 10,
        }),
        featureNumberGenerator(),
        (userStories, featureNumber) => {
          const generatedIds = generateAcceptanceCriteriaIds(
            userStories,
            featureNumber,
          );

          // Verify each ID increments by 1 from the previous
          for (let i = 1; i < generatedIds.length; i++) {
            const prevParsed = parseAcceptanceCriteriaId(generatedIds[i - 1]);
            const currParsed = parseAcceptanceCriteriaId(generatedIds[i]);

            const prevSequence = parseInt(prevParsed.sequence || '0', 10);
            const currSequence = parseInt(currParsed.sequence || '0', 10);

            expect(currSequence).toBe(prevSequence + 1);
          }
        },
      ),
      { numRuns: 100 },
    );
  });

  it('should use the same feature number for all generated IDs', () => {
    fc.assert(
      fc.property(
        fc.array(userStoryWithCriteriaGenerator(), {
          minLength: 1,
          maxLength: 10,
        }),
        featureNumberGenerator(),
        (userStories, featureNumber) => {
          const generatedIds = generateAcceptanceCriteriaIds(
            userStories,
            featureNumber,
          );

          // All IDs should have the same feature number
          for (const id of generatedIds) {
            const parsed = parseAcceptanceCriteriaId(id, featureNumber);
            expect(parsed.featureNumber).toBe(featureNumber);
            expect(parsed.featureNumberMatch).toBe(true);
          }
        },
      ),
      { numRuns: 100 },
    );
  });

  it('should generate correct total count of IDs', () => {
    fc.assert(
      fc.property(
        fc.array(userStoryWithCriteriaGenerator(), {
          minLength: 1,
          maxLength: 10,
        }),
        featureNumberGenerator(),
        (userStories, featureNumber) => {
          const generatedIds = generateAcceptanceCriteriaIds(
            userStories,
            featureNumber,
          );

          // Total IDs should equal sum of all acceptance criteria
          const expectedTotal = userStories.reduce(
            (sum, story) => sum + story.acceptanceCriteria.length,
            0,
          );
          expect(generatedIds.length).toBe(expectedTotal);
        },
      ),
      { numRuns: 100 },
    );
  });

  it('should handle edge case: single user story with multiple criteria', () => {
    const featureNumber = '006';
    const userStories: UserStory[] = [
      {
        id: 'US-006-01',
        acceptanceCriteria: ['Criterion 1', 'Criterion 2', 'Criterion 3'],
      },
    ];

    const generatedIds = generateAcceptanceCriteriaIds(
      userStories,
      featureNumber,
    );

    expect(generatedIds).toEqual(['AC-006-01', 'AC-006-02', 'AC-006-03']);
  });

  it('should handle edge case: multiple user stories with single criterion each', () => {
    const featureNumber = '006';
    const userStories: UserStory[] = [
      { id: 'US-006-01', acceptanceCriteria: ['Criterion 1'] },
      { id: 'US-006-02', acceptanceCriteria: ['Criterion 2'] },
      { id: 'US-006-03', acceptanceCriteria: ['Criterion 3'] },
    ];

    const generatedIds = generateAcceptanceCriteriaIds(
      userStories,
      featureNumber,
    );

    expect(generatedIds).toEqual(['AC-006-01', 'AC-006-02', 'AC-006-03']);
  });

  it('should handle edge case: mixed criteria counts across user stories', () => {
    const featureNumber = '006';
    const userStories: UserStory[] = [
      {
        id: 'US-006-01',
        acceptanceCriteria: ['Criterion 1', 'Criterion 2', 'Criterion 3'],
      },
      {
        id: 'US-006-02',
        acceptanceCriteria: ['Criterion 4', 'Criterion 5'],
      },
      { id: 'US-006-03', acceptanceCriteria: ['Criterion 6'] },
    ];

    const generatedIds = generateAcceptanceCriteriaIds(
      userStories,
      featureNumber,
    );

    expect(generatedIds).toEqual([
      'AC-006-01',
      'AC-006-02',
      'AC-006-03',
      'AC-006-04',
      'AC-006-05',
      'AC-006-06',
    ]);

    // Verify sequences are continuous
    for (let i = 0; i < generatedIds.length; i++) {
      const parsed = parseAcceptanceCriteriaId(generatedIds[i]);
      expect(parsed.sequence).toBe((i + 1).toString().padStart(2, '0'));
    }
  });

  it('should maintain sequential numbering with varying user story counts', () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 1, max: 20 }), // Number of user stories
        featureNumberGenerator(),
        (storyCount, featureNumber) => {
          // Generate user stories with random criteria counts
          const userStories: UserStory[] = [];
          for (let i = 0; i < storyCount; i++) {
            const criteriaCount = Math.floor(Math.random() * 5) + 1;
            userStories.push({
              id: `US-${featureNumber}-${(i + 1).toString().padStart(2, '0')}`,
              acceptanceCriteria: Array(criteriaCount).fill('criterion'),
            });
          }

          const generatedIds = generateAcceptanceCriteriaIds(
            userStories,
            featureNumber,
          );

          // Verify continuous sequential numbering
          for (let i = 0; i < generatedIds.length; i++) {
            const parsed = parseAcceptanceCriteriaId(generatedIds[i]);
            expect(parsed.sequence).toBe((i + 1).toString().padStart(2, '0'));
          }
        },
      ),
      { numRuns: 100 },
    );
  });

  it('should generate all IDs in the correct format', () => {
    fc.assert(
      fc.property(
        fc.array(userStoryWithCriteriaGenerator(), {
          minLength: 1,
          maxLength: 10,
        }),
        featureNumberGenerator(),
        (userStories, featureNumber) => {
          const generatedIds = generateAcceptanceCriteriaIds(
            userStories,
            featureNumber,
          );

          // All IDs should match the pattern AC-{3 digits}-{2 digits}
          for (const id of generatedIds) {
            expect(id).toMatch(/^AC-\d{3}-\d{2}$/);
          }
        },
      ),
      { numRuns: 100 },
    );
  });
});
