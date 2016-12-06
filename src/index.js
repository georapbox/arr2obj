import isArray from './util/is-array';
import isPlainObject from './util/is-plain-object';
import isString from './util/is-string';
import extend from './util/extend';

/**
 * Converts an array of primitives or objects to a plain object.
 *
 * @param {Array} array The initial array to convert.
 * @param {Object} [options] User defined options to override defaults.
 * @param {String} [options.key] If `array` is an array of objects and each object has a property with the value of `key`, use those as the properties of the result object. By default the index of each object in array is used.
 * @param {String} [options.keyPrefix=''] A string that prefixes the values of the specified `key`. If anything than string is provided, it takes the default value ('').
 * @param {String} [options.keySuffix=''] A string that suffixes the values of the specified `key`. If anything than string is provided, it takes the default value ('').
 * @param {Boolean} [options.deleteKey=false] If `key` is specified and `options.deleteKey` is true, delete the property from the result object.
 * @param {Boolean} [options.inheritProto=false] Determines if the result object should inherit from the `Object.prototype`.
 * @throws {TypeError} Will throw if `array` is not an Array.
 * @return {Object} The converted object.
 * @example
 *
 * const arr1 = [
 *   {_id: 'u0', name: 'John Doe', job: 'Frontend Developer'},
 *   {_id: 'u1', name: 'Albert Brown', job: 'Designer'},
 *   {_id: 'u2', name: 'Stuart Chalmers', job: 'Product Manager'},
 *   {_id: 'u3', name: 'Alberta Jonson', job: 'Account Manager'}
 * ];
 *
 * const arr2 = ['orange', 'banana', 'apple', 'cherry'];
 *
 * // Convert an array of objects using the "_id" property as key of the result object, prefixed with "$" character.
 * arr2obj(arr1, {
 *   key: '_id',
 *   keyPrefix: '$'
 * });
 * // -> {
 * // ->   '$u0': { _id: 'u0', name: 'John Doe', job: 'Frontend Developer' },
 * // ->   '$u1': { _id: 'u1', name: 'Albert Brown', job: 'Designer' },
 * // ->   '$u2': { _id: 'u2', name: 'Stuart Chalmers', job: 'Product Manager' },
 * // ->   '$u3': { _id: 'u3', name: 'Alberta Jonson', job: 'Account Manager' }
 * // -> }
 *
 * // Convert an array of objects using the "_id" property as key of the result object, and delete it from the result object.
 * arr2obj(arr1, {
 *   key: '_id',
 *   deleteKey: true
 * });
 * // -> {
 * // ->   'u0': { name: 'John Doe', job: 'Frontend Developer' },
 * // ->   'u1': { name: 'Albert Brown', job: 'Designer' },
 * // ->   'u2': { name: 'Stuart Chalmers', job: 'Product Manager' },
 * // ->   'u3': { name: 'Alberta Jonson', job: 'Account Manager' }
 * // -> }
 *
 * // Convert an array of strings with default options.
 * arr2obj(arr2);
 * // -> { '0': 'orange', '1': 'banana', '2': 'apple', '3': 'cherry' }
 *
 * // Convert an array of strings prefixing and suffixing the keys with "_" character.
 * arr2obj(arr2, {
 *   keyPrefix: '_',
 *   keySuffix: '_'
 * });
 * // -> { '_0_': 'orange', '_1_': 'banana', '_2_': 'apple', '_3_': 'cherry' }
 */
function arr2obj(array, options) {
  if (!isArray(array)) {
    throw new TypeError('arr2obj must be called on an Array');
  }

  /**
   * Dictionary of default options
   * @type {Object}
   */
  const defaults = {
    key: null,
    keyPrefix: '',
    keySuffix: '',
    deleteKey: false,
    inheritProto: false
  };

  /**
   * Copy of default and user options
   * @type {Object}
   */
  const settings = isPlainObject(options) ? extend({}, defaults, options) : extend({}, defaults);

  // Extract data from `settings` into dinstict variables.
  let {key, keyPrefix, keySuffix, deleteKey, inheritProto} = settings;

  // Failsafe if `keyPrefix` or `keySuffix` are not strings.
  keyPrefix = isString(keyPrefix) ? keyPrefix : '';
  keySuffix = isString(keySuffix) ? keySuffix : '';

  /**
   * The converted result object
   * @type {Object}
   */
  const converted = array.reduce(function (accum, current, index) {
    if (!key || !current[key]) {
      accum[keyPrefix + index + keySuffix] = current;
    } else {
      accum[keyPrefix + current[key] + keySuffix] = current;
    }

    if (key && deleteKey) {
      delete current[key];
    }

    return accum;
  }, inheritProto ? {} : Object.create(null));

  return converted;
}

export default arr2obj;
