import isArray from './util/is-array';
import isPlainObject from './util/is-plain-object';
import isString from './util/is-string';
import extend from './util/extend';

/**
 * Converts an array of primitives or objects to a plain object.
 *
 * @param {Array} array The initial array to convert.
 * @param {Object} [options] User defined options to override defaults.
 * @param {String} [options.key] If `array` is an array of objects and each object has a property with the value of `key`, use those as the properties of the result object. By default the index of each item in array is used.
 * @param {String} [options.keyPrefix=''] A string that prefixes the keys of the result object. If anything than string is provided, it takes the default value ('').
 * @param {String} [options.keySuffix=''] A string that suffixes the keys of the result object. If anything than string is provided, it takes the default value ('').
 * @param {Boolean} [options.deleteKey=false] Deletes the property of each item of the result object if `key` is specified and exists in current object. If `key` does not exist in current item or current item is not an object, leaves the property as is.
 * @param {Boolean} [options.inheritProto=false] Determines if the result object should inherit from the `Object.prototype`.
 * @throws {TypeError} Will throw if `array` is not an Array.
 * @return {Object} The converted object.
 */
function arr2obj(array, options) {
  if (!isArray(array)) {
    throw new TypeError('arr2obj must be called on an Array');
  }

  /**
   * Dictionary of default options
   * @private
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
   * @private
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
   * @private
   * @type {Object}
   */
  const converted = array.reduce(function (accum, current, index) {
    if (!key || !current[key]) {
      accum[keyPrefix + index + keySuffix] = current;
    } else {
      accum[keyPrefix + current[key] + keySuffix] = current;
    }

    if (deleteKey && key && isPlainObject(current)) {
      delete current[key];
    }

    return accum;
  }, inheritProto ? {} : Object.create(null));

  return converted;
}

export default arr2obj;
