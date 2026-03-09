/**
 * Unit Tests for Folder Path Edge Cases
 * Feature: azure-sync-id-consistency
 * Task: 1.2 Write unit tests for folder path edge cases
 *
 * **Validates: Requirements 1.6, 4.2, 4.3, 4.4**
 *
 * Test cases:
 * - 000 (invalid - out of range)
 * - 001 (valid - minimum)
 * - 999 (valid - maximum)
 * - 1000 (invalid - too many digits)
 * - Missing prefix
 * - Wrong format
 * - Missing underscore
 */

import { describe, expect, it } from 'vitest';

import { validateAndExtractFeatureNumber } from '@/lib/azure-sync/folder-path-validator';

describe('Folder Path Edge Cases', () => {
  describe('Numeric Range Edge Cases', () => {
    it('should reject 000 as out of range', () => {
      const result = validateAndExtractFeatureNumber('prds/000_feature_name/');

      expect(result.valid).toBe(false);
      expect(result.featureNumber).toBeNull();
      expect(result.error).not.toBeNull();
      expect(result.error?.type).toBe('OUT_OF_RANGE');
      expect(result.error?.message).toContain('001 and 999');
      expect(result.error?.message).toContain('000');
      expect(result.error?.expected).toBeDefined();
      expect(result.error?.actual).toBe('000_feature_name');
    });

    it('should accept 001 as valid minimum', () => {
      const result = validateAndExtractFeatureNumber('prds/001_feature_name/');

      expect(result.valid).toBe(true);
      expect(result.featureNumber).toBe('001');
      expect(result.error).toBeNull();
      expect(result.folderName).toBe('001_feature_name');
    });

    it('should accept 999 as valid maximum', () => {
      const result = validateAndExtractFeatureNumber('prds/999_feature_name/');

      expect(result.valid).toBe(true);
      expect(result.featureNumber).toBe('999');
      expect(result.error).toBeNull();
      expect(result.folderName).toBe('999_feature_name');
    });

    it('should reject 1000 as having too many digits', () => {
      const result = validateAndExtractFeatureNumber('prds/1000_feature_name/');

      expect(result.valid).toBe(false);
      expect(result.featureNumber).toBeNull();
      expect(result.error).not.toBeNull();
      expect(result.error?.type).toBe('INVALID_FORMAT');
      expect(result.error?.message).toContain('exactly 3 digits');
      expect(result.error?.message).toContain('found 4');
      expect(result.error?.expected).toContain('{NNN}_{feature_name}');
      expect(result.error?.actual).toBe('1000_feature_name');
    });
  });

  describe('Missing Prefix Edge Cases', () => {
    it('should reject folder name with no numeric prefix', () => {
      const result = validateAndExtractFeatureNumber('prds/feature_name/');

      expect(result.valid).toBe(false);
      expect(result.featureNumber).toBeNull();
      expect(result.error).not.toBeNull();
      expect(result.error?.type).toBe('MISSING_PREFIX');
      expect(result.error?.message).toContain(
        'must start with exactly 3 digits',
      );
      expect(result.error?.expected).toContain('006_about_founder_name');
      expect(result.error?.actual).toBe('feature_name');
    });

    it('should reject folder name starting with underscore', () => {
      const result = validateAndExtractFeatureNumber('prds/_feature_name/');

      expect(result.valid).toBe(false);
      expect(result.featureNumber).toBeNull();
      expect(result.error?.type).toBe('MISSING_PREFIX');
    });

    it('should reject folder name starting with letters', () => {
      const result = validateAndExtractFeatureNumber('prds/abc_feature_name/');

      expect(result.valid).toBe(false);
      expect(result.featureNumber).toBeNull();
      expect(result.error?.type).toBe('MISSING_PREFIX');
    });
  });

  describe('Wrong Format Edge Cases', () => {
    it('should reject folder name with only 1 digit', () => {
      const result = validateAndExtractFeatureNumber('prds/6_feature_name/');

      expect(result.valid).toBe(false);
      expect(result.featureNumber).toBeNull();
      expect(result.error).not.toBeNull();
      expect(result.error?.type).toBe('INVALID_FORMAT');
      expect(result.error?.message).toContain('exactly 3 digits');
      expect(result.error?.message).toContain('found 1');
    });

    it('should reject folder name with only 2 digits', () => {
      const result = validateAndExtractFeatureNumber('prds/06_feature_name/');

      expect(result.valid).toBe(false);
      expect(result.featureNumber).toBeNull();
      expect(result.error).not.toBeNull();
      expect(result.error?.type).toBe('INVALID_FORMAT');
      expect(result.error?.message).toContain('exactly 3 digits');
      expect(result.error?.message).toContain('found 2');
    });

    it('should reject folder name with 4 digits', () => {
      const result = validateAndExtractFeatureNumber('prds/0006_feature_name/');

      expect(result.valid).toBe(false);
      expect(result.featureNumber).toBeNull();
      expect(result.error).not.toBeNull();
      expect(result.error?.type).toBe('INVALID_FORMAT');
      expect(result.error?.message).toContain('exactly 3 digits');
      expect(result.error?.message).toContain('found 4');
    });

    it('should reject folder name with 5 digits', () => {
      const result = validateAndExtractFeatureNumber(
        'prds/12345_feature_name/',
      );

      expect(result.valid).toBe(false);
      expect(result.featureNumber).toBeNull();
      expect(result.error?.type).toBe('INVALID_FORMAT');
    });
  });

  describe('Missing Underscore Edge Cases', () => {
    it('should reject folder name with no underscore after digits', () => {
      const result = validateAndExtractFeatureNumber('prds/006feature_name/');

      expect(result.valid).toBe(false);
      expect(result.featureNumber).toBeNull();
      expect(result.error).not.toBeNull();
      expect(result.error?.type).toBe('MISSING_UNDERSCORE');
      expect(result.error?.message).toContain(
        'must be followed by an underscore',
      );
      expect(result.error?.expected).toContain('{NNN}_{feature_name}');
      expect(result.error?.actual).toBe('006feature_name');
    });

    it('should reject folder name with hyphen instead of underscore', () => {
      const result = validateAndExtractFeatureNumber('prds/006-feature_name/');

      expect(result.valid).toBe(false);
      expect(result.featureNumber).toBeNull();
      expect(result.error?.type).toBe('MISSING_UNDERSCORE');
    });

    it('should reject folder name with space instead of underscore', () => {
      const result = validateAndExtractFeatureNumber('prds/006 feature_name/');

      expect(result.valid).toBe(false);
      expect(result.featureNumber).toBeNull();
      expect(result.error?.type).toBe('MISSING_UNDERSCORE');
    });

    it('should reject folder name with only digits (no underscore or name)', () => {
      const result = validateAndExtractFeatureNumber('prds/006/');

      expect(result.valid).toBe(false);
      expect(result.featureNumber).toBeNull();
      expect(result.error?.type).toBe('MISSING_UNDERSCORE');
    });
  });

  describe('Error Message Quality', () => {
    it('should provide descriptive error for missing prefix', () => {
      const result = validateAndExtractFeatureNumber('prds/feature_name/');

      expect(result.error?.message).toContain(
        'must start with exactly 3 digits',
      );
      expect(result.error?.expected).toContain('006_about_founder_name');
      expect(result.error?.actual).toBe('feature_name');
    });

    it('should provide descriptive error for wrong digit count', () => {
      const result = validateAndExtractFeatureNumber('prds/06_feature_name/');

      expect(result.error?.message).toContain('exactly 3 digits');
      expect(result.error?.message).toContain('found 2');
      expect(result.error?.expected).toContain('{NNN}_{feature_name}');
    });

    it('should provide descriptive error for out of range', () => {
      const result = validateAndExtractFeatureNumber('prds/000_feature_name/');

      expect(result.error?.message).toContain('between 001 and 999');
      expect(result.error?.message).toContain('000');
      expect(result.error?.expected).toContain('001-999');
    });

    it('should provide descriptive error for missing underscore', () => {
      const result = validateAndExtractFeatureNumber('prds/006feature/');

      expect(result.error?.message).toContain(
        'must be followed by an underscore',
      );
      expect(result.error?.expected).toContain('{NNN}_{feature_name}');
    });
  });

  describe('Valid Path Variations', () => {
    it('should accept path without trailing slash', () => {
      const result = validateAndExtractFeatureNumber('prds/006_feature_name');

      expect(result.valid).toBe(true);
      expect(result.featureNumber).toBe('006');
    });

    it('should accept path with trailing slash', () => {
      const result = validateAndExtractFeatureNumber('prds/006_feature_name/');

      expect(result.valid).toBe(true);
      expect(result.featureNumber).toBe('006');
    });

    it('should accept nested path', () => {
      const result = validateAndExtractFeatureNumber(
        'path/to/prds/006_feature_name/',
      );

      expect(result.valid).toBe(true);
      expect(result.featureNumber).toBe('006');
    });

    it('should accept just folder name', () => {
      const result = validateAndExtractFeatureNumber('006_feature_name');

      expect(result.valid).toBe(true);
      expect(result.featureNumber).toBe('006');
    });

    it('should preserve leading zeros for small numbers', () => {
      const testCases = [
        { path: 'prds/001_feature/', expected: '001' },
        { path: 'prds/009_feature/', expected: '009' },
        { path: 'prds/010_feature/', expected: '010' },
        { path: 'prds/099_feature/', expected: '099' },
      ];

      testCases.forEach(({ path, expected }) => {
        const result = validateAndExtractFeatureNumber(path);
        expect(result.valid).toBe(true);
        expect(result.featureNumber).toBe(expected);
        expect(result.featureNumber?.length).toBe(3);
      });
    });
  });

  describe('Folder Name Extraction', () => {
    it('should extract correct folder name from simple path', () => {
      const result = validateAndExtractFeatureNumber('006_feature_name');

      expect(result.folderName).toBe('006_feature_name');
    });

    it('should extract correct folder name from nested path', () => {
      const result = validateAndExtractFeatureNumber('prds/006_feature_name/');

      expect(result.folderName).toBe('006_feature_name');
    });

    it('should extract correct folder name from deeply nested path', () => {
      const result = validateAndExtractFeatureNumber(
        'path/to/prds/006_feature_name/',
      );

      expect(result.folderName).toBe('006_feature_name');
    });
  });
});
