/**
 * Property-Based Tests for User Story ID Parsing Round Trip
 * Feature: azure-sync-id-consistency
 * Task: 2.1 Write property test for User Story ID parsing round trip
 *
 * **Validates: Requirements 2.1, 2.2, 2.3**
 */

import * as fc from 'fast-check';
import { describe, expect, it } from 'vitest';

import {
  parseUserStoryId,
  reconstructUserStoryId,
} from '@/lib/azure-sync/user-story-id-parser';

describe('Property 2: User Story ID Parsing Round Trip', () => {
  /**
   * Generator for valid User Story IDs
   * Format: US-{001-999}-{01-99}
   */
  const userStoryIdGenerator = () => {
    return fc
      .tuple(
        // Feature number: 001-999 with leading zeros
        fc
          .integer({ min: 1, max: 999 })
          .map(n => n.toString().padStart(3, '0')),
        // Sequence number: 01-99 with leading zero
        fc.integer({ min: 1, max: 99 }).map(n => n.toString().padStart(2, '0')),
      )
      .map(([featureNumber, sequence]) => `US-${featureNumber}-${sequence}`);
  };

  it('should parse and reconstruct User Story IDs correctly (round trip)', () => {
    fc.assert(
      fc.property(userStoryIdGenerator(), originalId => {
        // Parse the ID
        const parsed = parseUserStoryId(originalId);

        // Should be valid
        expect(parsed.valid).toBe(true);
        expect(parsed.originalId).toBe(originalId);
        expect(parsed.error).toBeNull();

        // Feature number should be 3 digits
        expect(parsed.featureNumber).toMatch(/^\d{3}$/);
        expect(parsed.featureNumber?.length).toBe(3);

        // Sequence should be 2 digits
        expect(parsed.sequence).toMatch(/^\d{2}$/);
        expect(parsed.sequence?.length).toBe(2);

        // Reconstruct the ID from parsed components
        const reconstructed = reconstructUserStoryId(
          parsed.featureNumber!,
          parsed.sequence!,
        );

        // Round trip: reconstructed should equal original
        expect(reconstructed).toBe(originalId);
      }),
      { numRuns: 100 },
    );
  });

  it('should extract feature number correctly from User Story IDs', () => {
    fc.assert(
      fc.property(
        fc
          .integer({ min: 1, max: 999 })
          .map(n => n.toString().padStart(3, '0')),
        fc.integer({ min: 1, max: 99 }).map(n => n.toString().padStart(2, '0')),
        (featureNumber, sequence) => {
          const id = `US-${featureNumber}-${sequence}`;
          const parsed = parseUserStoryId(id);

          // Should extract correct feature number
          expect(parsed.featureNumber).toBe(featureNumber);

          // Feature number should preserve leading zeros
          expect(parsed.featureNumber?.length).toBe(3);
        },
      ),
      { numRuns: 100 },
    );
  });

  it('should extract sequence number correctly from User Story IDs', () => {
    fc.assert(
      fc.property(
        fc
          .integer({ min: 1, max: 999 })
          .map(n => n.toString().padStart(3, '0')),
        fc.integer({ min: 1, max: 99 }).map(n => n.toString().padStart(2, '0')),
        (featureNumber, sequence) => {
          const id = `US-${featureNumber}-${sequence}`;
          const parsed = parseUserStoryId(id);

          // Should extract correct sequence
          expect(parsed.sequence).toBe(sequence);

          // Sequence should preserve leading zero
          expect(parsed.sequence?.length).toBe(2);
        },
      ),
      { numRuns: 100 },
    );
  });

  it('should preserve leading zeros in feature numbers', () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 1, max: 99 }).map(n => n.toString().padStart(3, '0')),
        fc.integer({ min: 1, max: 99 }).map(n => n.toString().padStart(2, '0')),
        (featureNumber, sequence) => {
          const id = `US-${featureNumber}-${sequence}`;
          const parsed = parseUserStoryId(id);

          // Feature number should preserve leading zeros
          expect(parsed.featureNumber).toBe(featureNumber);
          expect(parsed.featureNumber?.startsWith('0')).toBe(true);
          expect(parsed.featureNumber?.length).toBe(3);
        },
      ),
      { numRuns: 100 },
    );
  });

  it('should preserve leading zeros in sequence numbers', () => {
    fc.assert(
      fc.property(
        fc
          .integer({ min: 1, max: 999 })
          .map(n => n.toString().padStart(3, '0')),
        fc.integer({ min: 1, max: 9 }).map(n => n.toString().padStart(2, '0')),
        (featureNumber, sequence) => {
          const id = `US-${featureNumber}-${sequence}`;
          const parsed = parseUserStoryId(id);

          // Sequence should preserve leading zero
          expect(parsed.sequence).toBe(sequence);
          expect(parsed.sequence?.startsWith('0')).toBe(true);
          expect(parsed.sequence?.length).toBe(2);
        },
      ),
      { numRuns: 100 },
    );
  });

  it('should handle edge cases: minimum and maximum values', () => {
    const edgeCases = [
      { id: 'US-001-01', featureNumber: '001', sequence: '01' },
      { id: 'US-999-99', featureNumber: '999', sequence: '99' },
      { id: 'US-001-99', featureNumber: '001', sequence: '99' },
      { id: 'US-999-01', featureNumber: '999', sequence: '01' },
    ];

    edgeCases.forEach(({ id, featureNumber, sequence }) => {
      const parsed = parseUserStoryId(id);

      expect(parsed.valid).toBe(true);
      expect(parsed.featureNumber).toBe(featureNumber);
      expect(parsed.sequence).toBe(sequence);

      // Round trip
      const reconstructed = reconstructUserStoryId(
        parsed.featureNumber!,
        parsed.sequence!,
      );
      expect(reconstructed).toBe(id);
    });
  });

  it('should reject invalid User Story ID formats', () => {
    const invalidIds = [
      'US-001', // Missing sequence
      'US-1-01', // Feature number too short
      'US-0001-01', // Feature number too long
      'US-006-1', // Sequence too short
      'US-006-001', // Sequence too long
      'US-ABC-01', // Non-numeric feature number
      'US-006-AB', // Non-numeric sequence
      'US006-01', // Missing hyphen
      'US-006_01', // Wrong separator
      'us-006-01', // Lowercase prefix
      'USER-006-01', // Wrong prefix
      '', // Empty string
    ];

    invalidIds.forEach(id => {
      const parsed = parseUserStoryId(id);

      expect(parsed.valid).toBe(false);
      expect(parsed.featureNumber).toBeNull();
      expect(parsed.sequence).toBeNull();
      expect(parsed.error).not.toBeNull();
      expect(parsed.error).toContain('Invalid format');
    });
  });

  it('should validate feature number match when expected feature number is provided', () => {
    fc.assert(
      fc.property(
        fc
          .integer({ min: 1, max: 999 })
          .map(n => n.toString().padStart(3, '0')),
        fc
          .integer({ min: 1, max: 999 })
          .map(n => n.toString().padStart(3, '0')),
        fc.integer({ min: 1, max: 99 }).map(n => n.toString().padStart(2, '0')),
        (featureNumber, expectedFeatureNumber, sequence) => {
          const id = `US-${featureNumber}-${sequence}`;
          const parsed = parseUserStoryId(id, expectedFeatureNumber);

          expect(parsed.valid).toBe(true);
          expect(parsed.featureNumber).toBe(featureNumber);

          if (featureNumber === expectedFeatureNumber) {
            // Should match
            expect(parsed.featureNumberMatch).toBe(true);
            expect(parsed.error).toBeNull();
          } else {
            // Should not match
            expect(parsed.featureNumberMatch).toBe(false);
            expect(parsed.error).not.toBeNull();
            expect(parsed.error).toContain('Feature number mismatch');
            expect(parsed.error).toContain(expectedFeatureNumber);
            expect(parsed.error).toContain(featureNumber);
          }
        },
      ),
      { numRuns: 100 },
    );
  });

  it('should reconstruct IDs correctly from any valid components', () => {
    fc.assert(
      fc.property(
        fc
          .integer({ min: 1, max: 999 })
          .map(n => n.toString().padStart(3, '0')),
        fc.integer({ min: 1, max: 99 }).map(n => n.toString().padStart(2, '0')),
        (featureNumber, sequence) => {
          const reconstructed = reconstructUserStoryId(featureNumber, sequence);

          // Should match expected format
          expect(reconstructed).toMatch(/^US-\d{3}-\d{2}$/);

          // Should contain the components
          expect(reconstructed).toContain(featureNumber);
          expect(reconstructed).toContain(sequence);

          // Should be parseable
          const parsed = parseUserStoryId(reconstructed);
          expect(parsed.valid).toBe(true);
          expect(parsed.featureNumber).toBe(featureNumber);
          expect(parsed.sequence).toBe(sequence);
        },
      ),
      { numRuns: 100 },
    );
  });
});
