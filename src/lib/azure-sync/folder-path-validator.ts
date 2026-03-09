/**
 * Folder Path Validator for Azure Sync ID Consistency
 *
 * Validates folder paths and extracts feature numbers according to the pattern:
 * {NNN}_{feature_name} where NNN is a 3-digit number between 001 and 999
 */

export type ValidationErrorType =
  | 'MISSING_PREFIX'
  | 'INVALID_FORMAT'
  | 'OUT_OF_RANGE'
  | 'MISSING_UNDERSCORE';

export interface ValidationError {
  type: ValidationErrorType;
  message: string;
  expected: string;
  actual: string;
}

export interface FolderPathValidationResult {
  valid: boolean;
  featureNumber: string | null;
  folderName: string;
  error: ValidationError | null;
}

/**
 * Validates a folder path and extracts the 3-digit feature number
 *
 * @param folderPath - Full path to the folder (e.g., "prds/006_about_founder_name/")
 * @returns Validation result with feature number or error
 */
export function validateAndExtractFeatureNumber(
  folderPath: string,
): FolderPathValidationResult {
  // Extract folder name from path (last segment before trailing slash)
  const normalizedPath = folderPath.replace(/\/$/, ''); // Remove trailing slash
  const segments = normalizedPath.split('/');
  const folderName = segments[segments.length - 1];

  // Check if folder name starts with 3 digits
  const prefixMatch = folderName.match(/^(\d+)/);

  if (!prefixMatch) {
    return {
      valid: false,
      featureNumber: null,
      folderName,
      error: {
        type: 'MISSING_PREFIX',
        message: 'Folder name must start with exactly 3 digits',
        expected: '{NNN}_{feature_name} (e.g., 006_about_founder_name)',
        actual: folderName,
      },
    };
  }

  const prefix = prefixMatch[1];

  // Check if prefix is exactly 3 digits
  if (prefix.length !== 3) {
    return {
      valid: false,
      featureNumber: null,
      folderName,
      error: {
        type: 'INVALID_FORMAT',
        message: `Folder name must start with exactly 3 digits, found ${prefix.length}`,
        expected: '{NNN}_{feature_name} (e.g., 006_about_founder_name)',
        actual: folderName,
      },
    };
  }

  // Check if 4th character is underscore
  if (folderName[3] !== '_') {
    return {
      valid: false,
      featureNumber: null,
      folderName,
      error: {
        type: 'MISSING_UNDERSCORE',
        message: 'The 3-digit prefix must be followed by an underscore',
        expected: '{NNN}_{feature_name} (e.g., 006_about_founder_name)',
        actual: folderName,
      },
    };
  }

  // Check if numeric prefix is between 001 and 999
  const numericValue = parseInt(prefix, 10);
  if (numericValue < 1 || numericValue > 999) {
    return {
      valid: false,
      featureNumber: null,
      folderName,
      error: {
        type: 'OUT_OF_RANGE',
        message: `Feature number must be between 001 and 999, found ${prefix}`,
        expected: '{NNN}_{feature_name} where NNN is 001-999',
        actual: folderName,
      },
    };
  }

  // Valid folder path - return feature number with leading zeros preserved
  return {
    valid: true,
    featureNumber: prefix,
    folderName,
    error: null,
  };
}
