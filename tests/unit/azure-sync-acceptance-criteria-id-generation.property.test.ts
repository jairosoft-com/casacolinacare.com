/**
 * Property-Based Tests for Acceptance Criteria ID Generation
 * Feature: azure-sync-id-consistency
 * Task: 3.2 Write property test for Acceptance Criteria ID generation
 *
 * **Validates: Requirements 3.4**
 */

import * as fc from 'fast-check';
import { describe, expect, it } from 'vitest';

import { generateAcceptanceCriteriaId } from '@/lib/azure-sync/acceptance-criteria-id-generator';
import { parseAcceptanceCriteriaId } from '@/lib/azure-sync/acceptance-criteria-id-parser';

describe('Property 6: Acceptance Criteria ID Generation', () => {
  /**
   * Generator for valid feature numbers (001-999)
   */
  const featureNumberGenerator = () => {
    return fc
      .integer({ min: 1, max: 999 })
      .map(n => n.toString().padStart(3, '0'));
  };

  /**
   * Generator for valid sequence numbers (1-99)
   */
  const sequenceNumberGenerator = () => {
    return fc.integer({ min: 1, max: 99 });
  };

  it('should generate Acceptance Criteria IDs in the correct format', () => {
    fc.assert(
      fc.property(
        featureNumberGenerator(),
        sequenceNumberGenerator(),
        (featureNumber, sequence) => {
          const id = generateAcceptanceCriteriaId(featureNumber, sequence);

          // Should match the pattern AC-{3 digits}-{2 digits}
          expect(id).toMatch(/^AC-\d{3}-\d{2}$/);

          // Should start with AC-
          expect(id).toMatch(/^AC-/);

          // Should contain the feature number
          expect(id).toContain(featureNumber);
        },
      ),
      { numRuns: 100 },
    );
  });

  it('should preserve leading zeros in feature numbers', () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 1, max: 99 }).map(n => n.toString().padStart(3, '0')),
        sequenceNumberGenerator(),
        (featureNumber, sequence) => {
          const id = generateAcceptanceCriteriaId(featureNumber, sequence);

          // Feature number should be preserved with leading zeros
          expect(id).toContain(featureNumber);

          // Parse the ID to verify feature number
          const parsed = parseAcceptanceCriteriaId(id);
          expect(parsed.featureNumber).toBe(featureNumber);
          expect(parsed.featureNumber?.length).toBe(3);
        },
      ),
      { numRuns: 100 },
    );
  });

  it('should zero-pad sequence numbers to 2 digits', () => {
    fc.assert(
      fc.property(
        featureNumberGenerator(),
        fc.integer({ min: 1, max: 9 }), // Single digit sequences
        (featureNumber, sequence) => {
          const id = generateAcceptanceCriteriaId(featureNumber, sequence);

          // Parse the ID to verify sequence padding
          const parsed = parseAcceptanceCriteriaId(id);
          expect(parsed.sequence).toBe(sequence.toString().padStart(2, '0'));
          expect(parsed.sequence?.length).toBe(2);

          // Should start with 0 for single digit sequences
          expect(parsed.sequence?.startsWith('0')).toBe(true);
        },
      ),
      { numRuns: 100 },
    );
  });

  it('should generate parseable IDs', () => {
    fc.assert(
      fc.property(
        featureNumberGenerator(),
        sequenceNumberGenerator(),
        (featureNumber, sequence) => {
          const id = generateAcceptanceCriteriaId(featureNumber, sequence);

          // Generated ID should be parseable
          const parsed = parseAcceptanceCriteriaId(id);
          expect(parsed.valid).toBe(true);
          expect(parsed.error).toBeNull();
        },
      ),
      { numRuns: 100 },
    );
  });

  it('should generate IDs with correct feature number component', () => {
    fc.assert(
      fc.property(
        featureNumberGenerator(),
        sequenceNumberGenerator(),
        (featureNumber, sequence) => {
          const id = generateAcceptanceCriteriaId(featureNumber, sequence);

          // Parse and verify feature number matches
          const parsed = parseAcceptanceCriteriaId(id, featureNumber);
          expect(parsed.featureNumber).toBe(featureNumber);
          expect(parsed.featureNumberMatch).toBe(true);
        },
      ),
      { numRuns: 100 },
    );
  });

  it('should generate IDs with correct sequence component', () => {
    fc.assert(
      fc.property(
        featureNumberGenerator(),
        sequenceNumberGenerator(),
        (featureNumber, sequence) => {
          const id = generateAcceptanceCriteriaId(featureNumber, sequence);

          // Parse and verify sequence matches (with padding)
          const parsed = parseAcceptanceCriteriaId(id);
          const expectedSequence = sequence.toString().padStart(2, '0');
          expect(parsed.sequence).toBe(expectedSequence);
        },
      ),
      { numRuns: 100 },
    );
  });

  it('should handle edge cases: minimum and maximum values', () => {
    const edgeCases = [
      { featureNumber: '001', sequence: 1, expected: 'AC-001-01' },
      { featureNumber: '999', sequence: 99, expected: 'AC-999-99' },
      { featureNumber: '001', sequence: 99, expected: 'AC-001-99' },
      { featureNumber: '999', sequence: 1, expected: 'AC-999-01' },
      { featureNumber: '006', sequence: 15, expected: 'AC-006-15' },
    ];

    edgeCases.forEach(({ featureNumber, sequence, expected }) => {
      const id = generateAcceptanceCriteriaId(featureNumber, sequence);

      expect(id).toBe(expected);

      // Should be parseable
      const parsed = parseAcceptanceCriteriaId(id);
      expect(parsed.valid).toBe(true);
      expect(parsed.featureNumber).toBe(featureNumber);
      expect(parsed.sequence).toBe(sequence.toString().padStart(2, '0'));
    });
  });

  it('should generate unique IDs for different sequences', () => {
    fc.assert(
      fc.property(
        featureNumberGenerator(),
        fc.array(sequenceNumberGenerator(), {
          minLength: 2,
          maxLength: 10,
        }),
        (featureNumber, sequences) => {
          // Generate IDs for all sequences
          const ids = sequences.map(seq =>
            generateAcceptanceCriteriaId(featureNumber, seq),
          );

          // Remove duplicates by converting to Set
          const uniqueIds = new Set(ids);

          // If all sequences are unique, all IDs should be unique
          const uniqueSequences = new Set(sequences);
          expect(uniqueIds.size).toBe(uniqueSequences.size);
        },
      ),
      { numRuns: 100 },
    );
  });

  it('should generate IDs that maintain feature number consistency', () => {
    fc.assert(
      fc.property(
        featureNumberGenerator(),
        fc.array(sequenceNumberGenerator(), {
          minLength: 1,
          maxLength: 20,
        }),
        (featureNumber, sequences) => {
          // Generate multiple IDs with the same feature number
          const ids = sequences.map(seq =>
            generateAcceptanceCriteriaId(featureNumber, seq),
          );

          // All IDs should have the same feature number
          ids.forEach(id => {
            const parsed = parseAcceptanceCriteriaId(id, featureNumber);
            expect(parsed.featureNumber).toBe(featureNumber);
            expect(parsed.featureNumberMatch).toBe(true);
          });
        },
      ),
      { numRuns: 100 },
    );
  });

  it('should handle sequential numbering correctly', () => {
    fc.assert(
      fc.property(
        featureNumberGenerator(),
        fc.integer({ min: 1, max: 50 }), // Starting sequence
        fc.integer({ min: 1, max: 20 }), // Count of sequences
        (featureNumber, startSequence, count) => {
          // Generate sequential IDs
          const ids: string[] = [];
          for (let i = 0; i < count; i++) {
            const sequence = startSequence + i;
            if (sequence > 99) break; // Don't exceed 2-digit limit
            ids.push(generateAcceptanceCriteriaId(featureNumber, sequence));
          }

          // Verify sequential numbering
          ids.forEach((id, index) => {
            const parsed = parseAcceptanceCriteriaId(id);
            const expectedSequence = (startSequence + index)
              .toString()
              .padStart(2, '0');
            expect(parsed.sequence).toBe(expectedSequence);
          });
        },
      ),
      { numRuns: 100 },
    );
  });

  it('should generate IDs with consistent format across all inputs', () => {
    fc.assert(
      fc.property(
        featureNumberGenerator(),
        sequenceNumberGenerator(),
        (featureNumber, sequence) => {
          const id = generateAcceptanceCriteriaId(featureNumber, sequence);

          // Should always have exactly 9 characters: AC-XXX-YY
          // A C - X X X - Y Y
          // 1 2 3 4 5 6 7 8 9
          expect(id.length).toBe(9);

          // Should have hyphens at positions 2 and 6 (0-indexed)
          expect(id[2]).toBe('-');
          expect(id[6]).toBe('-');

          // Should have AC prefix
          expect(id.slice(0, 2)).toBe('AC');

          // Feature number should be at positions 3-5 (indices 3,4,5)
          expect(id.slice(3, 6)).toBe(featureNumber);

          // Sequence should be at positions 7-8 (indices 7,8)
          const expectedSequence = sequence.toString().padStart(2, '0');
          expect(id.slice(7)).toBe(expectedSequence);
        },
      ),
      { numRuns: 100 },
    );
  });
});
