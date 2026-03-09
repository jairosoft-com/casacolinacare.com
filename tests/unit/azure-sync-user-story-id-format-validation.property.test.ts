/**
 * Property-Based Tests for User Story ID Format Validation
 * Feature: azure-sync-id-consistency
 * Task: 2.2 Write property test for User Story ID format validation
 *
 * **Validates: Requirements 2.4, 2.5**
 */

import * as fc from 'fast-check';
import { describe, expect, it } from 'vitest';

import type { UserStory } from '@/lib/azure-sync/user-story-id-validator';
import { validateUserStoryIds } from '@/lib/azure-sync/user-story-id-validator';

describe('Property 3: User Story ID Format Validation', () => {
  /**
   * Generator for valid User Story IDs
   * Format: US-{001-999}-{01-99}
   */
  const validUserStoryIdGenerator = () => {
    return fc
      .tuple(
        fc
          .integer({ min: 1, max: 999 })
          .map(n => n.toString().padStart(3, '0')),
        fc.integer({ min: 1, max: 99 }).map(n => n.toString().padStart(2, '0')),
      )
      .map(([featureNumber, sequence]) => `US-${featureNumber}-${sequence}`);
  };

  /**
   * Generator for invalid User Story IDs (wrong format)
   */
  const invalidUserStoryIdGenerator = () => {
    return fc.oneof(
      // Missing sequence
      fc
        .integer({ min: 1, max: 999 })
        .map(n => `US-${n.toString().padStart(3, '0')}`),
      // Wrong number of digits in feature number
      fc
        .tuple(
          fc.integer({ min: 1, max: 99 }).map(n => n.toString()), // 1-2 digits
          fc
            .integer({ min: 1, max: 99 })
            .map(n => n.toString().padStart(2, '0')),
        )
        .map(([feature, seq]) => `US-${feature}-${seq}`),
      // Wrong number of digits in sequence
      fc
        .tuple(
          fc
            .integer({ min: 1, max: 999 })
            .map(n => n.toString().padStart(3, '0')),
          fc.integer({ min: 1, max: 9 }).map(n => n.toString()), // 1 digit
        )
        .map(([feature, seq]) => `US-${feature}-${seq}`),
      // Wrong separator
      fc
        .tuple(
          fc
            .integer({ min: 1, max: 999 })
            .map(n => n.toString().padStart(3, '0')),
          fc
            .integer({ min: 1, max: 99 })
            .map(n => n.toString().padStart(2, '0')),
        )
        .map(([feature, seq]) => `US${feature}-${seq}`), // Missing hyphen
      // Wrong prefix
      fc
        .tuple(
          fc
            .integer({ min: 1, max: 999 })
            .map(n => n.toString().padStart(3, '0')),
          fc
            .integer({ min: 1, max: 99 })
            .map(n => n.toString().padStart(2, '0')),
        )
        .map(([feature, seq]) => `USER-${feature}-${seq}`),
      // Lowercase prefix
      fc
        .tuple(
          fc
            .integer({ min: 1, max: 999 })
            .map(n => n.toString().padStart(3, '0')),
          fc
            .integer({ min: 1, max: 99 })
            .map(n => n.toString().padStart(2, '0')),
        )
        .map(([feature, seq]) => `us-${feature}-${seq}`),
    );
  };

  /**
   * Generator for User Story objects with valid IDs
   */
  const validUserStoryGenerator = () => {
    return fc
      .tuple(
        validUserStoryIdGenerator(),
        fc.string({ minLength: 5, maxLength: 50 }), // title
        fc.string({ minLength: 10, maxLength: 200 }), // description
      )
      .map(([id, title, description]) => ({
        id,
        title,
        description,
      }));
  };

  /**
   * Generator for User Story objects with invalid IDs
   */
  const invalidUserStoryGenerator = () => {
    return fc
      .tuple(
        invalidUserStoryIdGenerator(),
        fc.string({ minLength: 5, maxLength: 50 }), // title
        fc.string({ minLength: 10, maxLength: 200 }), // description
      )
      .map(([id, title, description]) => ({
        id,
        title,
        description,
      }));
  };

  /**
   * Generator for mixed arrays of valid and invalid user stories
   */
  const mixedUserStoriesGenerator = () => {
    return fc
      .tuple(
        fc.array(validUserStoryGenerator(), { minLength: 0, maxLength: 10 }),
        fc.array(invalidUserStoryGenerator(), { minLength: 0, maxLength: 5 }),
      )
      .map(([valid, invalid]) => {
        // Shuffle the arrays together
        const combined = [...valid, ...invalid];
        return fc.shuffledSubarray(combined, {
          minLength: combined.length,
          maxLength: combined.length,
        });
      })
      .chain(gen => gen);
  };

  it('should validate all User Story IDs in a JSON metadata file', () => {
    fc.assert(
      fc.property(
        fc.array(validUserStoryGenerator(), { minLength: 1, maxLength: 20 }),
        userStories => {
          const result = validateUserStoryIds(userStories);

          // Should validate all stories
          expect(result.totalUserStories).toBe(userStories.length);

          // All should be valid
          expect(result.validUserStories).toBe(userStories.length);
          expect(result.invalidUserStories).toBe(0);

          // Should have no warnings
          expect(result.warnings).toHaveLength(0);

          // Should be valid overall
          expect(result.valid).toBe(true);

          // Should continue processing
          expect(result.continuedProcessing).toBe(true);
        },
      ),
      { numRuns: 100 },
    );
  });

  it('should log warnings for invalid User Story ID formats', () => {
    fc.assert(
      fc.property(
        fc.array(invalidUserStoryGenerator(), { minLength: 1, maxLength: 10 }),
        userStories => {
          const result = validateUserStoryIds(userStories);

          // Should validate all stories
          expect(result.totalUserStories).toBe(userStories.length);

          // All should be invalid
          expect(result.invalidUserStories).toBe(userStories.length);
          expect(result.validUserStories).toBe(0);

          // Should have warnings for each invalid ID
          expect(result.warnings.length).toBe(userStories.length);

          // Each warning should have the invalid ID
          result.warnings.forEach((warning, index) => {
            expect(warning.id).toBe(userStories[index].id);
            expect(warning.message).toBeDefined();
            expect(warning.type).toBe('INVALID_FORMAT');
          });

          // Should not be valid overall
          expect(result.valid).toBe(false);

          // Should continue processing despite errors
          expect(result.continuedProcessing).toBe(true);
        },
      ),
      { numRuns: 100 },
    );
  });

  it('should continue processing after encountering invalid IDs', () => {
    fc.assert(
      fc.property(mixedUserStoriesGenerator(), userStories => {
        if (userStories.length === 0) return; // Skip empty arrays

        const result = validateUserStoryIds(userStories);

        // Should always continue processing
        expect(result.continuedProcessing).toBe(true);

        // Should validate all stories
        expect(result.totalUserStories).toBe(userStories.length);

        // Valid + invalid should equal total
        expect(result.validUserStories + result.invalidUserStories).toBe(
          userStories.length,
        );

        // Warnings count should match invalid count
        expect(result.warnings.length).toBe(result.invalidUserStories);
      }),
      { numRuns: 100 },
    );
  });

  it('should validate User Story IDs match expected format pattern', () => {
    fc.assert(
      fc.property(
        fc.array(validUserStoryGenerator(), { minLength: 1, maxLength: 10 }),
        userStories => {
          const result = validateUserStoryIds(userStories);

          // All IDs should match the pattern US-{3 digits}-{2 digits}
          const pattern = /^US-\d{3}-\d{2}$/;
          userStories.forEach(story => {
            expect(story.id).toMatch(pattern);
          });

          // Should be valid
          expect(result.valid).toBe(true);
          expect(result.warnings).toHaveLength(0);
        },
      ),
      { numRuns: 100 },
    );
  });

  it('should handle empty user story arrays', () => {
    const result = validateUserStoryIds([]);

    expect(result.totalUserStories).toBe(0);
    expect(result.validUserStories).toBe(0);
    expect(result.invalidUserStories).toBe(0);
    expect(result.warnings).toHaveLength(0);
    expect(result.valid).toBe(true);
    expect(result.continuedProcessing).toBe(true);
  });

  it('should validate feature numbers match expected feature number', () => {
    fc.assert(
      fc.property(
        fc
          .integer({ min: 1, max: 999 })
          .map(n => n.toString().padStart(3, '0')),
        fc.array(
          fc
            .integer({ min: 1, max: 99 })
            .map(n => n.toString().padStart(2, '0')),
          { minLength: 1, maxLength: 10 },
        ),
        (featureNumber, sequences) => {
          // Create user stories with the same feature number
          const userStories: UserStory[] = sequences.map(seq => ({
            id: `US-${featureNumber}-${seq}`,
            title: 'Test Story',
          }));

          const result = validateUserStoryIds(userStories, featureNumber);

          // All should be valid
          expect(result.valid).toBe(true);
          expect(result.validUserStories).toBe(userStories.length);
          expect(result.warnings).toHaveLength(0);
        },
      ),
      { numRuns: 100 },
    );
  });

  it('should log warnings for feature number mismatches', () => {
    fc.assert(
      fc.property(
        fc
          .integer({ min: 1, max: 999 })
          .map(n => n.toString().padStart(3, '0')),
        fc
          .integer({ min: 1, max: 999 })
          .map(n => n.toString().padStart(3, '0')),
        fc.integer({ min: 1, max: 99 }).map(n => n.toString().padStart(2, '0')),
        (expectedFeatureNumber, actualFeatureNumber, sequence) => {
          // Skip if feature numbers are the same
          if (expectedFeatureNumber === actualFeatureNumber) return;
          const userStories: UserStory[] = [
            {
              id: `US-${actualFeatureNumber}-${sequence}`,
              title: 'Test Story',
            },
          ];

          const result = validateUserStoryIds(
            userStories,
            expectedFeatureNumber,
          );

          // Should not be valid due to mismatch
          expect(result.valid).toBe(false);
          expect(result.invalidUserStories).toBe(1);

          // Should have a warning
          expect(result.warnings).toHaveLength(1);
          expect(result.warnings[0].type).toBe('FEATURE_NUMBER_MISMATCH');
          expect(result.warnings[0].message).toContain('mismatch');
          expect(result.warnings[0].message).toContain(expectedFeatureNumber);
          expect(result.warnings[0].message).toContain(actualFeatureNumber);

          // Should continue processing
          expect(result.continuedProcessing).toBe(true);
        },
      ),
      { numRuns: 100 },
    );
  });

  it('should handle user stories with additional fields', () => {
    fc.assert(
      fc.property(
        fc.array(
          fc
            .tuple(
              validUserStoryIdGenerator(),
              fc.string({ minLength: 5, maxLength: 50 }),
              fc.string({ minLength: 10, maxLength: 200 }),
              fc.integer({ min: 1, max: 5 }), // priority
              fc.string({ minLength: 5, maxLength: 30 }), // technicalSpecSection
            )
            .map(
              ([id, title, description, priority, technicalSpecSection]) => ({
                id,
                title,
                description,
                priority,
                technicalSpecSection,
                customField: 'custom value',
              }),
            ),
          { minLength: 1, maxLength: 10 },
        ),
        userStories => {
          const result = validateUserStoryIds(userStories);

          // Should validate successfully regardless of additional fields
          expect(result.valid).toBe(true);
          expect(result.validUserStories).toBe(userStories.length);
          expect(result.warnings).toHaveLength(0);
        },
      ),
      { numRuns: 100 },
    );
  });

  it('should provide descriptive warning messages for invalid formats', () => {
    const invalidUserStories: UserStory[] = [
      { id: 'US-001', title: 'Missing sequence' },
      { id: 'US-06-01', title: 'Wrong feature number length' },
      { id: 'US-006-1', title: 'Wrong sequence length' },
      { id: 'USER-006-01', title: 'Wrong prefix' },
    ];

    const result = validateUserStoryIds(invalidUserStories);

    expect(result.warnings).toHaveLength(4);

    result.warnings.forEach(warning => {
      // Each warning should have a descriptive message
      expect(warning.message).toBeDefined();
      expect(warning.message.length).toBeGreaterThan(0);

      // Should mention the expected format
      expect(warning.message).toContain('US-');

      // Should include the invalid ID
      expect(warning.id).toBeDefined();
    });
  });
});
