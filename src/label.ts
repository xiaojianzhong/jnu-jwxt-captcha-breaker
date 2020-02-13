import { Vector1D } from './vector';

export const NUM_CLASSES = 62;

const outOfRangeError = new Error('The index is out of the valid range.');

/**
 * Validate whether the index is in the range.
 *
 * @param {number} index
 *
 * @return {boolean}
 */
function validate(index: number): boolean {
  return index >= 0 && index <= 61;
}

/**
 * Convert the index into a label.
 *
 * @param {number} index
 *
 * @return {string}
 */
export function index2Label(index: number): string {
  if (!validate(index)) {
    throw outOfRangeError;
  }

  if (index < 10) {
    // 0 ~ 9
    return `${index}`;
  } else if (index < 36) {
    // A ~ Z
    return `${String.fromCharCode(index + 55)}`;
  } else if (index < 62) {
    // a ~ z
    return `${String.fromCharCode(index + 61)}`;
  } else {
    // Never reach here.
    return '';
  }
}

/**
 * Convert the index into a 1-dimension vector.
 * The vector uses one-hot encoding.
 *
 * @param {number} index
 *
 * @return {Vector1D}
 */
export function index2Vector(index: number): Vector1D {
  if (!validate(index)) {
    throw outOfRangeError;
  }

  const vector = new Array(NUM_CLASSES).fill(0);
  vector[index] = 1;
  return vector;
}
