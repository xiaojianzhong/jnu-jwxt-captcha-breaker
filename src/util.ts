/**
 * Fill the number into a string with the specific length.
 *
 * @param {number} number The number to be filled.
 * @param {number} numDigits The number of digits needed.
 *
 * @return {string} The filled number string.
 */
export function fill(number: number, numDigits: number): string {
  if (number < 0) {
    throw new Error('The number is less than 0.');
  }

  const length = number.toString().length;
  if (numDigits < length) {
    throw new Error("The number of digits is less than the number's length.");
  }

  const numZeros = numDigits - length;
  const zeroArray = new Array(numZeros).fill(0);
  return `${zeroArray.join('')}${number}`;
}
