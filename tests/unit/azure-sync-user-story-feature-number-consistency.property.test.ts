/**
 * Property-Based Tests for User Story Feature Number Consistency
 * Feature: azure-sync-id-consistency
 * Task: 2.3 Write property test for User Story feature number consistency
 *
 * **Validates: Requirements 2.6, 6.2, 6.4**
 */

import * as fc from 'fast-check';
import { describe, expect, it } from 'vitest';

import type { UserStory } from '@/lib/azure-sync/user-story-id-validator';
import { validateUserStoryIds } from '@/lib/azure-sync/user-story-id-validator';

describe('Property 4: User Story Feature Number Consistency', () => {
  /**
   * Generator for valid User Story IDs with a specific feature number
   */
  const userStoryIdWithFeatureNumberGenerator = (featureNumber: string) => {
    return fc
      .integer({ min: 1, max: 99 })
      .map(n => n.toString().padStart(2, '0'))
      .map(sequence => `US-${featureNumber}-${sequence}`);
  };

  /**
   * Generator for User Story objects with consistent feature numbers
   */
  const consistentUserStoriesGenerator = () => {
    return fc
      .tuple(
        // Feature number from folder path
        fc
          .integer({ min: 1, max: 999 })
          .map(n => n.toString().padStart(3, '0')),
        // Number of user stories
        fc.integer({ min: 1, max: 20 }),
      )
      .chain(([featureNumber, count]) => {
        return fc
          .array(
            fc
              .tuple(
                userStoryIdWithFeatureNumberGenerator(featureNumber),
                fc.string({ minLength: 5, maxLength: 50 }), // title
                fc.string({ minLength: 10, maxLength: 200 }), // description
              )
              .map(([id, title, description]) => ({
                id,
                title,
                description,
              })),
            { minLength: count, maxLength: count },
          )
          .map(userStories => ({ featureNumber, userStories }));
      });
  };

  /**
   * Generator for User Story objects with inconsistent feature numbers
   */
  const inconsistentUserStoriesGenerator = () => {
    return fc
      .tuple(
        // Expected feature number from folder path
        fc
          .integer({ min: 1, max: 999 })
          .map(n => n.toString().padStart(3, '0')),
        // Different feature number for some stories
        fc
          .integer({ min: 1, max: 999 })
          .map(n => n.toString().padStart(3, '0')),
        // Number of consistent stories
        fc.integer({ min: 0, max: 10 }),
        // Number of inconsistent stories
        fc.integer({ min: 1, max: 10 }),
      )
      .filter(([expected, actual]) => expected !== actual)
      .chain(
        ([
          expectedFeature,
          actualFeature,
          consistentCount,
          inconsistentCount,
        ]) => {
          return fc
            .tuple(
              // Consistent stories
              fc.array(
                fc
                  .tuple(
                    userStoryIdWithFeatureNumberGenerator(expectedFeature),
                    fc.string({ minLength: 5, maxLength: 50 }),
                    fc.string({ minLength: 10, maxLength: 200 }),
                  )
                  .map(([id, title, description]) => ({
                    id,
                    title,
                    description,
                  })),
                { minLength: consistentCount, maxLength: consistentCount },
              ),
              // Inconsistent stories
              fc.array(
                fc
                  .tuple(
                    userStoryIdWithFeatureNumberGenerator(actualFeature),
                    fc.string({ minLength: 5, maxLength: 50 }),
                    fc.string({ minLength: 10, maxLength: 200 }),
                  )
                  .map(([id, title, description]) => ({
                    id,
                    title,
                    description,
                  })),
                { minLength: inconsistentCount, maxLength: inconsistentCount },
              ),
            )
            .map(([consistent, inconsistent]) => ({
              expectedFeatureNumber: expectedFeature,
              actualFeatureNumber: actualFeature,
              userStories: [...consistent, ...inconsistent],
              expectedMismatchCount: inconsistentCount,
            }));
        },
      );
  };

  /**
   * Generator for mixed feature numbers (some matching, some not)
   */
  const mixedFeatureNumbersGenerator = () => {
    return fc
      .tuple(
        // Expected feature number
        fc
          .integer({ min: 1, max: 999 })
          .map(n => n.toString().padStart(3, '0')),
        // Array of feature numbers (some matching, some not)
        fc.array(
          fc
            .integer({ min: 1, max: 999 })
            .map(n => n.toString().padStart(3, '0')),
          { minLength: 1, maxLength: 15 },
        ),
      )
      .chain(([expectedFeature, featureNumbers]) => {
        return fc
          .array(
            fc
              .tuple(
                fc.constantFrom(...featureNumbers),
                fc
                  .integer({ min: 1, max: 99 })
                  .map(n => n.toString().padStart(2, '0')),
                fc.string({ minLength: 5, maxLength: 50 }),
              )
              .map(([feature, seq, title]) => ({
                id: `US-${feature}-${seq}`,
                title,
              })),
            { minLength: 1, maxLength: 20 },
          )
          .map(userStories => {
            const mismatchCount = userStories.filter(
              story => !story.id.includes(`US-${expectedFeature}-`),
            ).length;
            return {
              expectedFeatureNumber: expectedFeature,
              userStories,
              expectedMismatchCount: mismatchCount,
            };
          });
      });
  };

  it('should validate all User Story IDs contain the same feature number as folder path', () => {
    fc.assert(
      fc.property(
        consistentUserStoriesGenerator(),
        ({ featureNumber, userStories }) => {
          const result = validateUserStoryIds(userStories, featureNumber);

          // All stories should be valid
          expect(result.valid).toBe(true);
          expect(result.validUserStories).toBe(userStories.length);
          expect(result.invalidUserStories).toBe(0);

          // Should have no warnings
          expect(result.warnings).toHaveLength(0);

          // Should continue processing
          expect(result.continuedProcessing).toBe(true);

          // Verify all IDs contain the expected feature number
          userStories.forEach(story => {
            expect(story.id).toContain(`US-${featureNumber}-`);
          });
        },
      ),
      { numRuns: 100 },
    );
  });

  it('should log warnings for User Story IDs with mismatched feature numbers', () => {
    fc.assert(
      fc.property(
        inconsistentUserStoriesGenerator(),
        ({
          expectedFeatureNumber,
          actualFeatureNumber,
          userStories,
          expectedMismatchCount,
        }) => {
          const result = validateUserStoryIds(
            userStories,
            expectedFeatureNumber,
          );

          // Should not be valid due to mismatches
          expect(result.valid).toBe(false);

          // Should have warnings for mismatched IDs
          expect(result.warnings.length).toBe(expectedMismatchCount);

          // All warnings should be about feature number mismatches
          result.warnings.forEach(warning => {
            expect(warning.type).toBe('FEATURE_NUMBER_MISMATCH');
            expect(warning.message).toContain('mismatch');
            expect(warning.message).toContain(expectedFeatureNumber);
            expect(warning.message).toContain(actualFeatureNumber);
          });

          // Should continue processing despite mismatches
          expect(result.continuedProcessing).toBe(true);

          // Invalid count should match mismatch count
          expect(result.invalidUserStories).toBe(expectedMismatchCount);
        },
      ),
      { numRuns: 100 },
    );
  });

  it('should continue processing after logging feature number mismatch warnings', () => {
    fc.assert(
      fc.property(
        mixedFeatureNumbersGenerator(),
        ({ expectedFeatureNumber, userStories, expectedMismatchCount }) => {
          const result = validateUserStoryIds(
            userStories,
            expectedFeatureNumber,
          );

          // Should always continue processing
          expect(result.continuedProcessing).toBe(true);

          // Should validate all stories
          expect(result.totalUserStories).toBe(userStories.length);

          // Valid + invalid should equal total
          expect(result.validUserStories + result.invalidUserStories).toBe(
            userStories.length,
          );

          // Mismatch count should be accurate
          expect(result.invalidUserStories).toBe(expectedMismatchCount);
          expect(result.warnings.length).toBe(expectedMismatchCount);
        },
      ),
      { numRuns: 100 },
    );
  });

  it('should validate feature number consistency with edge case feature numbers', () => {
    const edgeCases = [
      { featureNumber: '001', description: 'minimum feature number' },
      { featureNumber: '999', description: 'maximum feature number' },
      {
        featureNumber: '006',
        description: 'feature number with leading zeros',
      },
      {
        featureNumber: '100',
        description: 'feature number without leading zeros',
      },
    ];

    edgeCases.forEach(({ featureNumber, description }) => {
      fc.assert(
        fc.property(
          fc.array(
            fc
              .integer({ min: 1, max: 99 })
              .map(n => n.toString().padStart(2, '0'))
              .map(seq => ({
                id: `US-${featureNumber}-${seq}`,
                title: `Story for ${description}`,
              })),
            { minLength: 1, maxLength: 10 },
          ),
          userStories => {
            const result = validateUserStoryIds(userStories, featureNumber);

            // All should be valid
            expect(result.valid).toBe(true);
            expect(result.validUserStories).toBe(userStories.length);
            expect(result.warnings).toHaveLength(0);
          },
        ),
        { numRuns: 20 },
      );
    });
  });

  it('should handle empty user story arrays with feature number validation', () => {
    fc.assert(
      fc.property(
        fc
          .integer({ min: 1, max: 999 })
          .map(n => n.toString().padStart(3, '0')),
        featureNumber => {
          const result = validateUserStoryIds([], featureNumber);

          expect(result.valid).toBe(true);
          expect(result.totalUserStories).toBe(0);
          expect(result.validUserStories).toBe(0);
          expect(result.invalidUserStories).toBe(0);
          expect(result.warnings).toHaveLength(0);
          expect(result.continuedProcessing).toBe(true);
        },
      ),
      { numRuns: 100 },
    );
  });

  it('should preserve leading zeros when validating feature numbers', () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 1, max: 99 }).map(n => n.toString().padStart(3, '0')),
        fc.array(
          fc
            .integer({ min: 1, max: 99 })
            .map(n => n.toString().padStart(2, '0')),
          { minLength: 1, maxLength: 10 },
        ),
        (featureNumber, sequences) => {
          const userStories: UserStory[] = sequences.map(seq => ({
            id: `US-${featureNumber}-${seq}`,
            title: 'Test Story',
          }));

          const result = validateUserStoryIds(userStories, featureNumber);

          // All should be valid
          expect(result.valid).toBe(true);
          expect(result.validUserStories).toBe(userStories.length);

          // Verify leading zeros are preserved in IDs
          userStories.forEach(story => {
            expect(story.id).toMatch(/^US-\d{3}-\d{2}$/);
            expect(story.id).toContain(featureNumber);
          });
        },
      ),
      { numRuns: 100 },
    );
  });

  it('should report accurate mismatch count for multiple mismatched IDs', () => {
    fc.assert(
      fc.property(
        fc
          .integer({ min: 1, max: 999 })
          .map(n => n.toString().padStart(3, '0')),
        fc.array(
          fc
            .tuple(
              fc
                .integer({ min: 1, max: 999 })
                .map(n => n.toString().padStart(3, '0')),
              fc
                .integer({ min: 1, max: 99 })
                .map(n => n.toString().padStart(2, '0')),
            )
            .map(([feature, seq]) => ({
              id: `US-${feature}-${seq}`,
              title: 'Test Story',
            })),
          { minLength: 1, maxLength: 20 },
        ),
        (expectedFeatureNumber, userStories) => {
          const result = validateUserStoryIds(
            userStories,
            expectedFeatureNumber,
          );

          // Count actual mismatches
          const actualMismatchCount = userStories.filter(
            story => !story.id.includes(`US-${expectedFeatureNumber}-`),
          ).length;

          // Reported mismatch count should match actual
          expect(result.invalidUserStories).toBe(actualMismatchCount);
          expect(result.warnings.length).toBe(actualMismatchCount);

          // Valid + invalid should equal total
          expect(result.validUserStories + result.invalidUserStories).toBe(
            userStories.length,
          );
        },
      ),
      { numRuns: 100 },
    );
  });

  it('should handle user stories with additional fields during consistency validation', () => {
    fc.assert(
      fc.property(
        fc
          .integer({ min: 1, max: 999 })
          .map(n => n.toString().padStart(3, '0')),
        fc.array(
          fc
            .tuple(
              fc
                .integer({ min: 1, max: 99 })
                .map(n => n.toString().padStart(2, '0')),
              fc.string({ minLength: 5, maxLength: 50 }),
              fc.string({ minLength: 10, maxLength: 200 }),
              fc.integer({ min: 1, max: 5 }),
              fc.string({ minLength: 5, maxLength: 30 }),
            )
            .map(
              ([seq, title, description, priority, technicalSpecSection]) => ({
                id: `US-${
                  fc.sample(
                    fc
                      .integer({ min: 1, max: 999 })
                      .map(n => n.toString().padStart(3, '0')),
                    1,
                  )[0]
                }-${seq}`,
                title,
                description,
                priority,
                technicalSpecSection,
                customField: 'custom value',
              }),
            ),
          { minLength: 1, maxLength: 10 },
        ),
        (expectedFeatureNumber, userStories) => {
          const result = validateUserStoryIds(
            userStories,
            expectedFeatureNumber,
          );

          // Should validate successfully regardless of additional fields
          expect(result.totalUserStories).toBe(userStories.length);
          expect(result.continuedProcessing).toBe(true);

          // Count should be accurate
          const actualMismatchCount = userStories.filter(
            story => !story.id.includes(`US-${expectedFeatureNumber}-`),
          ).length;
          expect(result.invalidUserStories).toBe(actualMismatchCount);
        },
      ),
      { numRuns: 100 },
    );
  });

  it('should provide descriptive warning messages for feature number mismatches', () => {
    const expectedFeatureNumber = '006';
    const mismatchedUserStories: UserStory[] = [
      { id: 'US-007-01', title: 'Story with wrong feature number' },
      { id: 'US-010-02', title: 'Another story with wrong feature number' },
      { id: 'US-999-03', title: 'Story with max feature number' },
    ];

    const result = validateUserStoryIds(
      mismatchedUserStories,
      expectedFeatureNumber,
    );

    expect(result.warnings).toHaveLength(3);

    result.warnings.forEach(warning => {
      // Each warning should have a descriptive message
      expect(warning.message).toBeDefined();
      expect(warning.message.length).toBeGreaterThan(0);

      // Should mention the expected feature number
      expect(warning.message).toContain(expectedFeatureNumber);

      // Should mention mismatch
      expect(warning.message).toContain('mismatch');

      // Should be the correct type
      expect(warning.type).toBe('FEATURE_NUMBER_MISMATCH');

      // Should include the invalid ID
      expect(warning.id).toBeDefined();
    });
  });
});
