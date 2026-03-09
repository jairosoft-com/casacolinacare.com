/**
 * User Story ID Parser for Azure Sync ID Consistency
 *
 * Parses User Story IDs in the format US-{feature_number}-{seq}
 * where feature_number is a 3-digit string and seq is a 2-digit string
 */

export interface ParsedUserStoryId {
  valid: boolean;
  originalId: string;
  featureNumber: string | null;
  sequence: string | null;
  featureNumberMatch: boolean;
  error: string | null;
}

/**
 * Parses a User Story ID and extracts its components
 *
 * @param id - User Story ID (e.g., "US-006-01")
 * @param expectedFeatureNumber - Optional feature number to validate against
 * @returns Parsed components or error
 */
export function parseUserStoryId(
  id: string,
  expectedFeatureNumber?: string,
): ParsedUserStoryId {
  // Regex pattern: US-{3 digits}-{2 digits}
  const pattern = /^US-(\d{3})-(\d{2})$/;
  const match = id.match(pattern);

  if (!match) {
    return {
      valid: false,
      originalId: id,
      featureNumber: null,
      sequence: null,
      featureNumberMatch: false,
      error: `Invalid format: expected US-{feature_number}-{seq}, found ${id}`,
    };
  }

  const featureNumber = match[1];
  const sequence = match[2];

  // Check if feature number matches expected (if provided)
  const featureNumberMatch = expectedFeatureNumber
    ? featureNumber === expectedFeatureNumber
    : true;

  const error =
    expectedFeatureNumber && !featureNumberMatch
      ? `Feature number mismatch: expected ${expectedFeatureNumber}, found ${featureNumber}`
      : null;

  return {
    valid: true,
    originalId: id,
    featureNumber,
    sequence,
    featureNumberMatch,
    error,
  };
}

/**
 * Reconstructs a User Story ID from its components
 *
 * @param featureNumber - 3-digit feature number (e.g., "006")
 * @param sequence - 2-digit sequence number (e.g., "01")
 * @returns Reconstructed User Story ID (e.g., "US-006-01")
 */
export function reconstructUserStoryId(
  featureNumber: string,
  sequence: string,
): string {
  return `US-${featureNumber}-${sequence}`;
}
