/**
 * Unit Tests for User Story ID Parsing
 * Feature: azure-sync-id-consistency
 * Task: 2.4 Write unit tests for User Story ID parsing
 *
 * Tests specific examples of valid and invalid User Story IDs
 * **Validates: Requirements 2.1, 2.2, 2.3, 2.4, 2.5, 2.6**
 */

import { describe, expect, it } from 'vitest';

import {
  parseUserStoryId,
  reconstructUserStoryId,
} from '@/lib/azure-sync/user-story-id-parser';

describe('User Story ID Parsing - Valid IDs', () => {
  it('should parse US-006-01 correctly', () => {
    const result = parseUserStoryId('US-006-01');

    expect(result.valid).toBe(true);
    expect(result.featureNumber).toBe('006');
    expect(result.sequence).toBe('01');
    expect(result.error).toBeNull();
    expect(result.originalId).toBe('US-006-01');
  });

  it('should parse US-010-05 correctly', () => {
    const result = parseUserStoryId('US-010-05');

    expect(result.valid).toBe(true);
    expect(result.featureNumber).toBe('010');
    expect(result.sequence).toBe('05');
    expect(result.error).toBeNull();
    expect(result.originalId).toBe('US-010-05');
  });

  it('should parse US-999-99 correctly', () => {
    const result = parseUserStoryId('US-999-99');

    expect(result.valid).toBe(true);
    expect(result.featureNumber).toBe('999');
    expect(result.sequence).toBe('99');
    expect(result.error).toBeNull();
    expect(result.originalId).toBe('US-999-99');
  });

  it('should preserve leading zeros in feature number', () => {
    const result = parseUserStoryId('US-006-01');

    expect(result.featureNumber).toBe('006');
    expect(result.featureNumber).not.toBe('6');
  });

  it('should preserve leading zeros in sequence number', () => {
    const result = parseUserStoryId('US-010-05');

    expect(result.sequence).toBe('05');
    expect(result.sequence).not.toBe('5');
  });
});

describe('User Story ID Parsing - Invalid IDs', () => {
  it('should reject US-001 (missing sequence)', () => {
    const result = parseUserStoryId('US-001');

    expect(result.valid).toBe(false);
    expect(result.featureNumber).toBeNull();
    expect(result.sequence).toBeNull();
    expect(result.error).toBeDefined();
    expect(result.error).toContain('Invalid format');
    expect(result.error).toContain('US-001');
  });

  it('should reject US-6-01 (feature number too short)', () => {
    const result = parseUserStoryId('US-6-01');

    expect(result.valid).toBe(false);
    expect(result.featureNumber).toBeNull();
    expect(result.sequence).toBeNull();
    expect(result.error).toBeDefined();
    expect(result.error).toContain('Invalid format');
    expect(result.error).toContain('US-6-01');
  });

  it('should reject US-006-1 (sequence too short)', () => {
    const result = parseUserStoryId('US-006-1');

    expect(result.valid).toBe(false);
    expect(result.featureNumber).toBeNull();
    expect(result.sequence).toBeNull();
    expect(result.error).toBeDefined();
    expect(result.error).toContain('Invalid format');
    expect(result.error).toContain('US-006-1');
  });

  it('should reject US-0006-01 (feature number too long)', () => {
    const result = parseUserStoryId('US-0006-01');

    expect(result.valid).toBe(false);
    expect(result.featureNumber).toBeNull();
    expect(result.sequence).toBeNull();
    expect(result.error).toBeDefined();
    expect(result.error).toContain('Invalid format');
  });

  it('should reject US-006-001 (sequence too long)', () => {
    const result = parseUserStoryId('US-006-001');

    expect(result.valid).toBe(false);
    expect(result.featureNumber).toBeNull();
    expect(result.sequence).toBeNull();
    expect(result.error).toBeDefined();
    expect(result.error).toContain('Invalid format');
  });

  it('should reject us-006-01 (lowercase prefix)', () => {
    const result = parseUserStoryId('us-006-01');

    expect(result.valid).toBe(false);
    expect(result.featureNumber).toBeNull();
    expect(result.sequence).toBeNull();
    expect(result.error).toBeDefined();
    expect(result.error).toContain('Invalid format');
  });

  it('should reject USER-006-01 (wrong prefix)', () => {
    const result = parseUserStoryId('USER-006-01');

    expect(result.valid).toBe(false);
    expect(result.featureNumber).toBeNull();
    expect(result.sequence).toBeNull();
    expect(result.error).toBeDefined();
    expect(result.error).toContain('Invalid format');
  });

  it('should reject US006-01 (missing first hyphen)', () => {
    const result = parseUserStoryId('US006-01');

    expect(result.valid).toBe(false);
    expect(result.featureNumber).toBeNull();
    expect(result.sequence).toBeNull();
    expect(result.error).toBeDefined();
    expect(result.error).toContain('Invalid format');
  });

  it('should reject US-00601 (missing second hyphen)', () => {
    const result = parseUserStoryId('US-00601');

    expect(result.valid).toBe(false);
    expect(result.featureNumber).toBeNull();
    expect(result.sequence).toBeNull();
    expect(result.error).toBeDefined();
    expect(result.error).toContain('Invalid format');
  });
});

describe('User Story ID Parsing - Feature Number Mismatch', () => {
  it('should detect feature number match when IDs match', () => {
    const result = parseUserStoryId('US-006-01', '006');

    expect(result.valid).toBe(true);
    expect(result.featureNumberMatch).toBe(true);
    expect(result.error).toBeNull();
  });

  it('should detect feature number mismatch', () => {
    const result = parseUserStoryId('US-007-01', '006');

    expect(result.valid).toBe(true);
    expect(result.featureNumber).toBe('007');
    expect(result.featureNumberMatch).toBe(false);
    expect(result.error).toBeDefined();
    expect(result.error).toContain('Feature number mismatch');
    expect(result.error).toContain('expected 006');
    expect(result.error).toContain('found 007');
  });

  it('should detect mismatch with leading zero differences', () => {
    const result = parseUserStoryId('US-010-01', '001');

    expect(result.valid).toBe(true);
    expect(result.featureNumber).toBe('010');
    expect(result.featureNumberMatch).toBe(false);
    expect(result.error).toBeDefined();
    expect(result.error).toContain('expected 001');
    expect(result.error).toContain('found 010');
  });

  it('should not report mismatch when expected feature number is not provided', () => {
    const result = parseUserStoryId('US-007-01');

    expect(result.valid).toBe(true);
    expect(result.featureNumberMatch).toBe(true);
    expect(result.error).toBeNull();
  });

  it('should handle mismatch at boundary values', () => {
    const result = parseUserStoryId('US-999-01', '001');

    expect(result.valid).toBe(true);
    expect(result.featureNumber).toBe('999');
    expect(result.featureNumberMatch).toBe(false);
    expect(result.error).toBeDefined();
    expect(result.error).toContain('expected 001');
    expect(result.error).toContain('found 999');
  });
});

describe('User Story ID Reconstruction', () => {
  it('should reconstruct US-006-01 from components', () => {
    const reconstructed = reconstructUserStoryId('006', '01');

    expect(reconstructed).toBe('US-006-01');
  });

  it('should reconstruct US-010-05 from components', () => {
    const reconstructed = reconstructUserStoryId('010', '05');

    expect(reconstructed).toBe('US-010-05');
  });

  it('should reconstruct US-999-99 from components', () => {
    const reconstructed = reconstructUserStoryId('999', '99');

    expect(reconstructed).toBe('US-999-99');
  });

  it('should preserve leading zeros in reconstruction', () => {
    const reconstructed = reconstructUserStoryId('006', '01');

    expect(reconstructed).toBe('US-006-01');
    expect(reconstructed).not.toBe('US-6-1');
  });
});

describe('User Story ID Round Trip', () => {
  it('should parse and reconstruct US-006-01 correctly', () => {
    const originalId = 'US-006-01';
    const parsed = parseUserStoryId(originalId);
    const reconstructed = reconstructUserStoryId(
      parsed.featureNumber!,
      parsed.sequence!,
    );

    expect(reconstructed).toBe(originalId);
  });

  it('should parse and reconstruct US-010-05 correctly', () => {
    const originalId = 'US-010-05';
    const parsed = parseUserStoryId(originalId);
    const reconstructed = reconstructUserStoryId(
      parsed.featureNumber!,
      parsed.sequence!,
    );

    expect(reconstructed).toBe(originalId);
  });

  it('should parse and reconstruct US-999-99 correctly', () => {
    const originalId = 'US-999-99';
    const parsed = parseUserStoryId(originalId);
    const reconstructed = reconstructUserStoryId(
      parsed.featureNumber!,
      parsed.sequence!,
    );

    expect(reconstructed).toBe(originalId);
  });

  it('should maintain leading zeros through round trip', () => {
    const originalId = 'US-001-01';
    const parsed = parseUserStoryId(originalId);

    expect(parsed.featureNumber).toBe('001');
    expect(parsed.sequence).toBe('01');

    const reconstructed = reconstructUserStoryId(
      parsed.featureNumber!,
      parsed.sequence!,
    );

    expect(reconstructed).toBe(originalId);
  });
});

describe('User Story ID Error Messages', () => {
  it('should include expected format in error message', () => {
    const result = parseUserStoryId('US-001');

    expect(result.error).toContain('US-{feature_number}-{seq}');
  });

  it('should include actual invalid ID in error message', () => {
    const result = parseUserStoryId('US-6-01');

    expect(result.error).toContain('US-6-01');
  });

  it('should provide descriptive mismatch error', () => {
    const result = parseUserStoryId('US-007-01', '006');

    expect(result.error).toContain('mismatch');
    expect(result.error).toContain('006');
    expect(result.error).toContain('007');
  });
});
