/**
 * Checks if 'value' is a boolean value.
 *
 * @param {*} value The value to check.
 * @return {Boolean} True if the 'value' is a boolean value, else false.
 * @example
 *
 * isBoolean(true);
 * // -> true
 *
 * isBoolean(false);
 * // -> true
 *
 * isBoolean({a: 'a'});
 * // -> false
 *
 * isBoolean(null);
 * // -> false
 */
export default function isBoolean(value) {
  return value === true || value === false ||
    Object.prototype.toString.call(value) === '[object Boolean]';
}
