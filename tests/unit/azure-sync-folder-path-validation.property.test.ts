/**
 * Property-Based Tests for Folder Path Validation
 * Feature: azure-sync-id-consistency
 *
 * **Validates: Requirements 1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 4.1, 4.2, 4.3, 4.4, 4.5, 6.1**
 */

import * as fc from 'fast-check';
import { describe, expect, it } from 'vitest';

import { validateAndExtractFeatureNumber } from '@/lib/azure-sync/folder-path-validator';

describe('Property 1: Folder Path Validation and Feature Number Extraction', () => {
  /**
   * Generator for valid folder paths
   * Format: {001-999}_{feature_name}
   */
  const validFolderPathGenerator = () => {
    return fc
      .tuple(
        // Feature number: 001-999 with leading zeros
        fc
          .integer({ min: 1, max: 999 })
          .map(n => n.toString().padStart(3, '0')),
        // Feature name: alphanumeric with underscores and hyphens
        fc
          .stringMatching(/^[a-z][\d_a-z-]*$/)
          .filter(s => s.length >= 3 && s.length <= 50),
      )
      .map(([featureNumber, featureName]) => {
        // Generate various path formats
        const folderName = `${featureNumber}_${featureName}`;
        return fc.constantFrom(
          folderName, // Just folder name
          `prds/${folderName}`, // With parent directory
          `prds/${folderName}/`, // With trailing slash
          `path/to/${folderName}`, // Nested path
          `path/to/${folderName}/`, // Nested path with trailing slash
        );
      })
      .chain(gen => gen);
  };

  /**
   * Generator for invalid folder paths - missing prefix
   */
  const invalidMissingPrefixGenerator = () => {
    return fc
      .stringMatching(/^[a-z][\d_a-z-]*$/)
      .filter(s => s.length >= 3)
      .map(name => `prds/${name}/`);
  };

  /**
   * Generator for invalid folder paths - wrong number of digits
   */
  const invalidWrongDigitCountGenerator = () => {
    return fc
      .tuple(
        fc.oneof(
          fc.integer({ min: 0, max: 99 }).map(n => n.toString()), // 1-2 digits
          fc.integer({ min: 1000, max: 9999 }).map(n => n.toString()), // 4+ digits
        ),
        fc.stringMatching(/^[a-z][\d_a-z-]*$/).filter(s => s.length >= 3),
      )
      .map(([digits, name]) => `prds/${digits}_${name}/`);
  };

  /**
   * Generator for invalid folder paths - missing underscore
   */
  const invalidMissingUnderscoreGenerator = () => {
    return fc
      .tuple(
        fc
          .integer({ min: 1, max: 999 })
          .map(n => n.toString().padStart(3, '0')),
        fc.stringMatching(/^[a-z][\d_a-z-]*$/).filter(s => s.length >= 3),
      )
      .map(([featureNumber, name]) => `prds/${featureNumber}${name}/`); // No underscore
  };

  /**
   * Generator for invalid folder paths - out of range (000)
   */
  const invalidOutOfRangeGenerator = () => {
    return fc
      .stringMatching(/^[a-z][\d_a-z-]*$/)
      .filter(s => s.length >= 3)
      .map(name => `prds/000_${name}/`);
  };

  /**
   * Helper to extract expected feature number from a valid path
   */
  function extractExpectedFeatureNumber(folderPath: string): string {
    const normalizedPath = folderPath.replace(/\/$/, '');
    const segments = normalizedPath.split('/');
    const folderName = segments[segments.length - 1];
    const match = folderName.match(/^(\d{3})_/);
    return match ? match[1] : '';
  }

  it('should extract feature number from valid folder paths', () => {
    fc.assert(
      fc.property(validFolderPathGenerator(), folderPath => {
        const result = validateAndExtractFeatureNumber(folderPath);

        // Should be valid
        expect(result.valid).toBe(true);

        // Feature number should be 3 digits
        expect(result.featureNumber).toMatch(/^\d{3}$/);

        // Feature number should match expected value
        const expected = extractExpectedFeatureNumber(folderPath);
        expect(result.featureNumber).toBe(expected);

        // Should not have an error
        expect(result.error).toBeNull();

        // Feature number should preserve leading zeros
        if (result.featureNumber) {
          expect(result.featureNumber.length).toBe(3);
        }
      }),
      { numRuns: 100 },
    );
  });

  it('should reject folder paths with missing numeric prefix', () => {
    fc.assert(
      fc.property(invalidMissingPrefixGenerator(), folderPath => {
        const result = validateAndExtractFeatureNumber(folderPath);

        // Should be invalid
        expect(result.valid).toBe(false);

        // Should not have a feature number
        expect(result.featureNumber).toBeNull();

        // Should have an error
        expect(result.error).not.toBeNull();
        expect(result.error?.type).toBe('MISSING_PREFIX');
        expect(result.error?.message).toContain('3 digits');
        expect(result.error?.expected).toBeDefined();
        expect(result.error?.actual).toBeDefined();
      }),
      { numRuns: 100 },
    );
  });

  it('should reject folder paths with wrong number of digits', () => {
    fc.assert(
      fc.property(invalidWrongDigitCountGenerator(), folderPath => {
        const result = validateAndExtractFeatureNumber(folderPath);

        // Should be invalid
        expect(result.valid).toBe(false);

        // Should not have a feature number
        expect(result.featureNumber).toBeNull();

        // Should have an error
        expect(result.error).not.toBeNull();
        expect(result.error?.type).toBe('INVALID_FORMAT');
        expect(result.error?.message).toContain('exactly 3 digits');
      }),
      { numRuns: 100 },
    );
  });

  it('should reject folder paths with missing underscore', () => {
    fc.assert(
      fc.property(invalidMissingUnderscoreGenerator(), folderPath => {
        const result = validateAndExtractFeatureNumber(folderPath);

        // Should be invalid
        expect(result.valid).toBe(false);

        // Should not have a feature number
        expect(result.featureNumber).toBeNull();

        // Should have an error
        expect(result.error).not.toBeNull();
        expect(result.error?.type).toBe('MISSING_UNDERSCORE');
        expect(result.error?.message).toContain('underscore');
      }),
      { numRuns: 100 },
    );
  });

  it('should reject folder paths with feature number 000 (out of range)', () => {
    fc.assert(
      fc.property(invalidOutOfRangeGenerator(), folderPath => {
        const result = validateAndExtractFeatureNumber(folderPath);

        // Should be invalid
        expect(result.valid).toBe(false);

        // Should not have a feature number
        expect(result.featureNumber).toBeNull();

        // Should have an error
        expect(result.error).not.toBeNull();
        expect(result.error?.type).toBe('OUT_OF_RANGE');
        expect(result.error?.message).toContain('001 and 999');
      }),
      { numRuns: 100 },
    );
  });

  it('should preserve leading zeros in feature numbers', () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 1, max: 99 }).map(n => n.toString().padStart(3, '0')),
        fc.stringMatching(/^[a-z][\d_a-z-]*$/).filter(s => s.length >= 3),
        (featureNumber, featureName) => {
          const folderPath = `prds/${featureNumber}_${featureName}/`;
          const result = validateAndExtractFeatureNumber(folderPath);

          // Should be valid
          expect(result.valid).toBe(true);

          // Feature number should preserve leading zeros
          expect(result.featureNumber).toBe(featureNumber);
          expect(result.featureNumber?.length).toBe(3);
        },
      ),
      { numRuns: 100 },
    );
  });

  it('should handle edge cases: 001, 999', () => {
    const edgeCases = [
      { path: 'prds/001_feature/', expected: '001' },
      { path: 'prds/999_feature/', expected: '999' },
    ];

    edgeCases.forEach(({ path, expected }) => {
      const result = validateAndExtractFeatureNumber(path);
      expect(result.valid).toBe(true);
      expect(result.featureNumber).toBe(expected);
    });
  });

  it('should reject edge case: 000', () => {
    const result = validateAndExtractFeatureNumber('prds/000_feature/');
    expect(result.valid).toBe(false);
    expect(result.error?.type).toBe('OUT_OF_RANGE');
  });

  it('should work with various path formats', () => {
    const paths = [
      '006_feature',
      'prds/006_feature',
      'prds/006_feature/',
      'path/to/006_feature',
      'path/to/006_feature/',
    ];

    paths.forEach(path => {
      const result = validateAndExtractFeatureNumber(path);
      expect(result.valid).toBe(true);
      expect(result.featureNumber).toBe('006');
    });
  });
});
