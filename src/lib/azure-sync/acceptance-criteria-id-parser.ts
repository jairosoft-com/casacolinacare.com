/**
 * Acceptance Criteria ID Parser for Azure Sync ID Consistency
 *
 * Parses Acceptance Criteria IDs in the format AC-{feature_number}-{seq}
 * where feature_number is a 3-digit string and seq is a 2-digit string
 */

export interface ParsedAcceptanceCriteriaId {
  valid: boolean;
  originalId: string;
  featureNumber: string | null;
  sequence: string | null;
  featureNumberMatch: boolean;
  error: string | null;
}

/**
 * Parses an Acceptance Criteria ID and extracts its components
 *
 * @param id - Acceptance Criteria ID (e.g., "AC-006-15")
 * @param expectedFeatureNumber - Optional feature number to validate against
 * @returns Parsed components or error
 */
export function parseAcceptanceCriteriaId(
  id: string,
  expectedFeatureNumber?: string,
): ParsedAcceptanceCriteriaId {
  // Regex pattern: AC-{3 digits}-{2 digits}
  const pattern = /^AC-(\d{3})-(\d{2})$/;
  const match = id.match(pattern);

  if (!match) {
    return {
      valid: false,
      originalId: id,
      featureNumber: null,
      sequence: null,
      featureNumberMatch: false,
      error: `Invalid format: expected AC-{feature_number}-{seq}, found ${id}`,
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
 * Reconstructs an Acceptance Criteria ID from its components
 *
 * @param featureNumber - 3-digit feature number (e.g., "006")
 * @param sequence - 2-digit sequence number (e.g., "15")
 * @returns Reconstructed Acceptance Criteria ID (e.g., "AC-006-15")
 */
export function reconstructAcceptanceCriteriaId(
  featureNumber: string,
  sequence: string,
): string {
  return `AC-${featureNumber}-${sequence}`;
}
