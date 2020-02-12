/**
 * Collect string elements together.
 * It is useful in a pipeline.
 *
 * @param {string} value
 * @param {string[]} previous
 *
 * @return {string[]}
 */
export function collect(value: string, previous: string[]): string[] {
  return previous.concat([value]);
}

interface Filename {
  full: string;
  prefix: string;
  suffix: string;
}

/**
 * Parse the file's name from the file's path.
 *
 * @param {string} path
 *
 * @return {Filename}
 */
export function parseFilename(path: string): Filename {
  if (path.length === 0) {
    throw new Error("The file's path is an empty string.");
  }

  const parts: string[] = path.split('/');
  const full: string = parts.pop() || '';

  const [prefix = '', suffix = ''] = full.split('.');

  return {
    full,
    prefix,
    suffix,
  };
}

/**
 * Fill the number into a string with the specific length.
 *
 * @param {number} number
 * @param {number} numDigits
 *
 * @return {string}
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
  const zeroArray: number[] = new Array(numZeros).fill(0);
  return `${zeroArray.join('')}${number}`;
}

/**
 * Calculate the difference score between two strings.
 *
 * @param {string} s1
 * @param {string} s2
 * @param {boolean} ignoreCase Whether to ignore case when comparing.
 *
 * @return {number}
 */
export function diffBetween(
  s1: string,
  s2: string,
  { ignoreCase } = { ignoreCase: false },
): number {
  if (s1.length !== s2.length) {
    throw new Error("Two strings aren't in the same length.");
  }
  const length = s1.length;

  let score = 0;
  for (let i = 0; i < length; i++) {
    if (ignoreCase) {
      if (s1[i].toLowerCase() === s2[i].toLowerCase()) {
        score++;
      }
    } else {
      if (s1[i] === s2[i]) {
        score++;
      }
    }
  }

  return score;
}
