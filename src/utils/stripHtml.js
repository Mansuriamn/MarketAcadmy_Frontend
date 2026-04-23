/**
 * Senior Developer Utility: Strip HTML tags and normalize content for excerpts.
 * This prevents broken layouts and raw HTML tags from appearing in list views.
 * @param {string} html - The HTML string to strip
 * @returns {string} - Cleaned text content
 */
export const stripHtml = (html) => {
  if (!html) return "";
  const doc = new DOMParser().parseFromString(html, 'text/html');
  const text = doc.body.textContent || "";
  return text.trim().replace(/\s+/g, ' '); // Normalize whitespace
};
