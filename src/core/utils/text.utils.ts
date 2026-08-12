/**
 * Elimina espacios al inicio y al final,
 * convierte el texto a minúsculas
 * y elimina tildes para realizar
 * comparaciones consistentes.
 */
export function normalizeText(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

/**
 * Verifica si dos textos son iguales
 * ignorando:
 *
 * - Espacios
 * - Mayúsculas
 * - Minúsculas
 * - Tildes
 */
export function isSameText(first: string, second: string): boolean {
  return normalizeText(first) === normalizeText(second);
}
