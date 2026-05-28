/**
 * Safe Array Utility - Prevents crashes from undefined/null array operations
 * Use these helpers everywhere array operations happen
 */

export const safeArray = (arr) => Array.isArray(arr) ? arr : [];

export const safeObject = (obj) => (obj && typeof obj === 'object') ? obj : {};

export const safeString = (str) => typeof str === 'string' ? str : '';

export const safeLength = (arr) => Array.isArray(arr) ? arr.length : 0;

/**
 * Safe map - Returns mapped array or empty array if not an array
 * Usage: safeMap(items, item => <Component key={item.id} item={item} />)
 */
export const safeMap = (arr, callback) => Array.isArray(arr) ? arr.map(callback) : null;

/**
 * Safe filter - Returns filtered array or empty array if not an array
 */
export const safeFilter = (arr, predicate) => Array.isArray(arr) ? arr.filter(predicate) : [];

/**
 * Safe slice - Returns sliced array or empty array if not an array
 */
export const safeSlice = (arr, start, end) => Array.isArray(arr) ? arr.slice(start, end) : [];

/**
 * Merge defaults with provided data - ensures all required fields exist
 */
export const mergeWithDefaults = (data, defaults) => ({
  ...defaults,
  ...data,
  // Ensure all nested arrays exist
  ...(data ? {
    projects: Array.isArray(data.projects) ? data.projects : defaults.projects || [],
    skills: data.skills && typeof data.skills === 'object' ? data.skills : defaults.skills || {},
    certifications: Array.isArray(data.certifications) ? data.certifications : defaults.certifications || [],
    achievements: Array.isArray(data.achievements) ? data.achievements : defaults.achievements || [],
    workshops: Array.isArray(data.workshops) ? data.workshops : defaults.workshops || [],
    stats: Array.isArray(data.stats) ? data.stats : defaults.stats || [],
    education: Array.isArray(data.education) ? data.education : defaults.education || [],
  } : {})
});
