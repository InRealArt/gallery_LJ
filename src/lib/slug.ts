/**
 * Generates a URL-friendly slug from text
 * - Converts to lowercase
 * - Removes accents/diacritics
 * - Replaces non-alphanumeric characters with hyphens
 * - Removes leading/trailing hyphens
 */
export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD") // Decompose accented characters
    .replace(/[\u0300-\u036f]/g, "") // Remove diacritics
    .replace(/[^a-z0-9]+/g, "-") // Replace non-alphanumeric with hyphens
    .replace(/^-+|-+$/g, ""); // Remove leading/trailing hyphens
}
