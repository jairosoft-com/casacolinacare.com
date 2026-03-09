/**
 * Acceptance Criteria ID Generator for Azure Sync ID Consistency
 *
 * Generates Acceptance Criteria IDs in the format AC-{feature_number}-{seq}
 * where feature_number is a 3-digit string and seq is a 2-digit string
 */

/**
 * Generates an Acceptance Criteria ID
 *
 * @param featureNumber - 3-digit feature number (e.g., "006")
 * @param globalSequence - Global sequence counter (e.g., 15)
 * @returns Generated Acceptance Criteria ID (e.g., "AC-006-15")
 */
export function generateAcceptanceCriteriaId(
  featureNumber: string,
  globalSequence: number,
): string {
  // Format sequence number with zero-padding to 2 digits
  const paddedSequence = globalSequence.toString().padStart(2, '0');

  // Construct ID: AC-{featureNumber}-{paddedSequence}
  return `AC-${featureNumber}-${paddedSequence}`;
}
