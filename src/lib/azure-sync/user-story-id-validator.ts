/**
 * User Story ID Validator for Azure Sync ID Consistency
 *
 * Validates User Story IDs in JSON metadata files according to the format:
 * US-{feature_number}-{seq} where feature_number is a 3-digit string
 * and seq is a 2-digit string
 */

import { parseUserStoryId } from './user-story-id-parser';

export interface UserStory {
  id: string;
  title?: string;
  description?: string;
  [key: string]: unknown;
}

export interface ValidationWarning {
  id: string;
  message: string;
  type: 'INVALID_FORMAT' | 'FEATURE_NUMBER_MISMATCH';
}

export interface UserStoryValidationResult {
  valid: boolean;
  totalUserStories: number;
  validUserStories: number;
  invalidUserStories: number;
  warnings: ValidationWarning[];
  continuedProcessing: boolean;
}

/**
 * Validates User Story IDs in a JSON metadata file
 *
 * @param userStories - Array of user story objects from JSON metadata
 * @param expectedFeatureNumber - Optional feature number to validate against
 * @returns Validation result with warnings for invalid IDs
 */
export function validateUserStoryIds(
  userStories: UserStory[],
  expectedFeatureNumber?: string,
): UserStoryValidationResult {
  const warnings: ValidationWarning[] = [];
  let validCount = 0;
  let invalidCount = 0;

  for (const story of userStories) {
    const parsed = parseUserStoryId(story.id, expectedFeatureNumber);

    if (!parsed.valid) {
      // Invalid format - log warning and continue
      warnings.push({
        id: story.id,
        message: parsed.error || 'Invalid User Story ID format',
        type: 'INVALID_FORMAT',
      });
      invalidCount++;
    } else if (parsed.error) {
      // Valid format but feature number mismatch - log warning and continue
      warnings.push({
        id: story.id,
        message: parsed.error,
        type: 'FEATURE_NUMBER_MISMATCH',
      });
      invalidCount++;
    } else {
      validCount++;
    }
  }

  return {
    valid: invalidCount === 0,
    totalUserStories: userStories.length,
    validUserStories: validCount,
    invalidUserStories: invalidCount,
    warnings,
    continuedProcessing: true, // Always continue processing
  };
}
