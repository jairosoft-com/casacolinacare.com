/**
 * Property-Based Tests for Acceptance Criteria ID Parsing Round Trip
 * Feature: azure-sync-id-consistency
 * Task: 3.1 Write property test for Acceptance Criteria ID parsing round trip
 *
 * **Validates: Requirements 3.1, 3.2, 3.3**
 */

import * as fc from 'fast-check';
import { describe, expect, it } from 'vitest';

import {
  parseAcceptanceCriteriaId,
  reconstructAcceptanceCriteriaId,
} from '@/lib/azure-sync/acceptance-criteria-id-parser';

describe('Property 5: Acceptance Criteria ID Parsing Round Trip', () => {
  /**
   * Generator for valid Acceptance Criteria IDs
   * Format: AC-{001-999}-{01-99}
   */
  const acceptanceCriteriaIdGenerator = () => {
    return fc
      .tuple(
        fc
          .integer({ min: 1, max: 999 })
          .map(n => n.toString().padStart(3, '0')),
        fc.integer({ min: 1, max: 99 }).map(n => n.toString().padStart(2, '0')),
      )
      .map(([featureNumber, sequence]) => `AC-${featureNumber}-${sequence}`);
  };

  it('should parse and reconstruct Acceptance Criteria IDs correctly (round trip)', () => {
    fc.assert(
      fc.property(acceptanceCriteriaIdGenerator(), originalId => {
        // Parse the ID
        const parsed = parseAcceptanceCriteriaId(originalId);

        // Should be valid
        expect(parsed.valid).toBe(true);
        expect(parsed.error).toBeNull();

        // Should extract components correctly
        expect(parsed.featureNumber).not.toBeNull();
        expect(parsed.sequence).not.toBeNull();

        // Feature number should be 3 digits
        expect(parsed.featureNumber).toMatch(/^\d{3}$/);

        // Sequence should be 2 digits
        expect(parsed.sequence).toMatch(/^\d{2}$/);

        // Reconstruct the ID from components
        const reconstructed = reconstructAcceptanceCriteriaId(
          parsed.featureNumber!,
          parsed.sequence!,
        );

        // Reconstructed ID should match original
        expect(reconstructed).toBe(originalId);

        // Original ID should be preserved
        expect(parsed.originalId).toBe(originalId);
      }),
      { numRuns: 100 },
    );
  });

  it('should extract feature number correctly from Acceptance Criteria IDs', () => {
    fc.assert(
      fc.property(
        fc
          .integer({ min: 1, max: 999 })
          .map(n => n.toString().padStart(3, '0')),
        fc.integer({ min: 1, max: 99 }).map(n => n.toString().padStart(2, '0')),
        (featureNumber, sequence) => {
          const id = `AC-${featureNumber}-${sequence}`;
          const parsed = parseAcceptanceCriteriaId(id);

          // Should extract the correct feature number
          expect(parsed.featureNumber).toBe(featureNumber);

          // Feature number should preserve leading zeros
          expect(parsed.featureNumber?.length).toBe(3);
        },
      ),
      { numRuns: 100 },
    );
  });

  it('should extract sequence number correctly from Acceptance Criteria IDs', () => {
    fc.assert(
      fc.property(
        fc
          .integer({ min: 1, max: 999 })
          .map(n => n.toString().padStart(3, '0')),
        fc.integer({ min: 1, max: 99 }).map(n => n.toString().padStart(2, '0')),
        (featureNumber, sequence) => {
          const id = `AC-${featureNumber}-${sequence}`;
          const parsed = parseAcceptanceCriteriaId(id);

          // Should extract the correct sequence number
          expect(parsed.sequence).toBe(sequence);

          // Sequence should preserve leading zeros
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
          const id = `AC-${featureNumber}-${sequence}`;
          const parsed = parseAcceptanceCriteriaId(id);

          // Feature number should have leading zeros preserved
          expect(parsed.featureNumber).toBe(featureNumber);
          expect(parsed.featureNumber?.startsWith('0')).toBe(true);
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
          const id = `AC-${featureNumber}-${sequence}`;
          const parsed = parseAcceptanceCriteriaId(id);

          // Sequence should have leading zeros preserved
          expect(parsed.sequence).toBe(sequence);
          expect(parsed.sequence?.startsWith('0')).toBe(true);
        },
      ),
      { numRuns: 100 },
    );
  });

  it('should handle edge cases: minimum and maximum values', () => {
    const edgeCases = [
      { id: 'AC-001-01', featureNumber: '001', sequence: '01' },
      { id: 'AC-999-99', featureNumber: '999', sequence: '99' },
      { id: 'AC-001-99', featureNumber: '001', sequence: '99' },
      { id: 'AC-999-01', featureNumber: '999', sequence: '01' },
    ];

    edgeCases.forEach(({ id, featureNumber, sequence }) => {
      const parsed = parseAcceptanceCriteriaId(id);

      expect(parsed.valid).toBe(true);
      expect(parsed.featureNumber).toBe(featureNumber);
      expect(parsed.sequence).toBe(sequence);

      // Round trip should work
      const reconstructed = reconstructAcceptanceCriteriaId(
        parsed.featureNumber!,
        parsed.sequence!,
      );
      expect(reconstructed).toBe(id);
    });
  });

  it('should validate feature number matches expected value', () => {
    fc.assert(
      fc.property(
        fc
          .integer({ min: 1, max: 999 })
          .map(n => n.toString().padStart(3, '0')),
        fc.integer({ min: 1, max: 99 }).map(n => n.toString().padStart(2, '0')),
        (featureNumber, sequence) => {
          const id = `AC-${featureNumber}-${sequence}`;
          const parsed = parseAcceptanceCriteriaId(id, featureNumber);

          // Should match expected feature number
          expect(parsed.featureNumberMatch).toBe(true);
          expect(parsed.error).toBeNull();
        },
      ),
      { numRuns: 100 },
    );
  });

  it('should detect feature number mismatch', () => {
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

          const id = `AC-${actualFeatureNumber}-${sequence}`;
          const parsed = parseAcceptanceCriteriaId(id, expectedFeatureNumber);

          // Should still be valid format
          expect(parsed.valid).toBe(true);

          // But feature number should not match
          expect(parsed.featureNumberMatch).toBe(false);

          // Should have an error message
          expect(parsed.error).not.toBeNull();
          expect(parsed.error).toContain('mismatch');
          expect(parsed.error).toContain(expectedFeatureNumber);
          expect(parsed.error).toContain(actualFeatureNumber);
        },
      ),
      { numRuns: 100 },
    );
  });

  it('should reject invalid Acceptance Criteria ID formats', () => {
    const invalidIds = [
      'AC-001', // Missing sequence
      'AC-06-01', // Wrong feature number length
      'AC-006-1', // Wrong sequence length
      'ACCEPT-006-01', // Wrong prefix
      'ac-006-01', // Lowercase prefix
      'AC006-01', // Missing hyphen
      'AC-006_01', // Wrong separator
      'US-006-01', // Wrong prefix (User Story)
    ];

    invalidIds.forEach(id => {
      const parsed = parseAcceptanceCriteriaId(id);

      expect(parsed.valid).toBe(false);
      expect(parsed.featureNumber).toBeNull();
      expect(parsed.sequence).toBeNull();
      expect(parsed.error).not.toBeNull();
      expect(parsed.error).toContain('Invalid format');
    });
  });

  it('should provide descriptive error messages for invalid formats', () => {
    fc.assert(
      fc.property(
        fc.oneof(
          // Missing sequence
          fc
            .integer({ min: 1, max: 999 })
            .map(n => `AC-${n.toString().padStart(3, '0')}`),
          // Wrong feature number length
          fc
            .tuple(
              fc.integer({ min: 1, max: 99 }).map(n => n.toString()),
              fc
                .integer({ min: 1, max: 99 })
                .map(n => n.toString().padStart(2, '0')),
            )
            .map(([feature, seq]) => `AC-${feature}-${seq}`),
          // Wrong sequence length
          fc
            .tuple(
              fc
                .integer({ min: 1, max: 999 })
                .map(n => n.toString().padStart(3, '0')),
              fc.integer({ min: 1, max: 9 }).map(n => n.toString()),
            )
            .map(([feature, seq]) => `AC-${feature}-${seq}`),
        ),
        invalidId => {
          const parsed = parseAcceptanceCriteriaId(invalidId);

          // Should be invalid
          expect(parsed.valid).toBe(false);

          // Should have descriptive error
          expect(parsed.error).not.toBeNull();
          expect(parsed.error).toContain('Invalid format');
          expect(parsed.error).toContain('AC-');
          expect(parsed.error).toContain(invalidId);
        },
      ),
      { numRuns: 100 },
    );
  });

  it('should handle reconstruction with various feature and sequence numbers', () => {
    fc.assert(
      fc.property(
        fc
          .integer({ min: 1, max: 999 })
          .map(n => n.toString().padStart(3, '0')),
        fc.integer({ min: 1, max: 99 }).map(n => n.toString().padStart(2, '0')),
        (featureNumber, sequence) => {
          const reconstructed = reconstructAcceptanceCriteriaId(
            featureNumber,
            sequence,
          );

          // Should match expected format
          expect(reconstructed).toMatch(/^AC-\d{3}-\d{2}$/);

          // Should contain the components
          expect(reconstructed).toContain(featureNumber);
          expect(reconstructed).toContain(sequence);

          // Should be parseable
          const parsed = parseAcceptanceCriteriaId(reconstructed);
          expect(parsed.valid).toBe(true);
          expect(parsed.featureNumber).toBe(featureNumber);
          expect(parsed.sequence).toBe(sequence);
        },
      ),
      { numRuns: 100 },
    );
  });
});
