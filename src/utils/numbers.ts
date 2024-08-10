// I could move all this functions to mask's ref of useNumberMask
// but there can also be cases where ref is not used

/**
 * Parse a number with a mask to a number
 * @param value Number with a mask
 * @see useNumberMask
 * @returns {number} Parsed number
 */
export function parseNumberMask(
  value: string | undefined,
): number | undefined {
  if (!value) return undefined;
  // / /g instead of ' ' because yes, otherwise it doesn't work
  const parsedValue = value.replace(/ /g, '').replace(',', '.');
  return Number(parsedValue);
}

/**
 * Format a number into a mask string
 * @param value Number
 * @returns {string} formatted number
 */
export function formatNumberMask(value: number): string {
  if (typeof value !== 'number') return '';

  const [integer, decimal] = value.toString().split('.');
  const integerFormatted = integer.replace(
    /\B(?=(\d{3})+(?!\d))/g,
    ' ',
  );

  return decimal !== undefined
    ? `${integerFormatted},${decimal}`
    : integerFormatted;
}
