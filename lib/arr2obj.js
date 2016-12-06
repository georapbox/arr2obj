(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("arr2obj", [], factory);
	else if(typeof exports === 'object')
		exports["arr2obj"] = factory();
	else
		root["arr2obj"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _isArray = __webpack_require__(1);
	
	var _isArray2 = _interopRequireDefault(_isArray);
	
	var _isPlainObject = __webpack_require__(2);
	
	var _isPlainObject2 = _interopRequireDefault(_isPlainObject);
	
	var _isString = __webpack_require__(3);
	
	var _isString2 = _interopRequireDefault(_isString);
	
	var _extend = __webpack_require__(4);
	
	var _extend2 = _interopRequireDefault(_extend);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
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
	 * // ->
	 * {
	 *   '$u0': { _id: 'u0', name: 'John Doe', job: 'Frontend Developer' },
	 *   '$u1': { _id: 'u1', name: 'Albert Brown', job: 'Designer' },
	 *   '$u2': { _id: 'u2', name: 'Stuart Chalmers', job: 'Product Manager' },
	 *   '$u3': { _id: 'u3', name: 'Alberta Jonson', job: 'Account Manager' }
	 * }
	 *
	 * // Convert an array of objects using the "_id" property as key of the result object, and delete it from the result object.
	 * arr2obj(arr1, {
	 *   key: '_id',
	 *   deleteKey: true
	 * });
	 * // ->
	 * {
	 *   'u0': { name: 'John Doe', job: 'Frontend Developer' },
	 *   'u1': { name: 'Albert Brown', job: 'Designer' },
	 *   'u2': { name: 'Stuart Chalmers', job: 'Product Manager' },
	 *   'u3': { name: 'Alberta Jonson', job: 'Account Manager' }
	 * }
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
	  if (!(0, _isArray2.default)(array)) {
	    throw new TypeError('arr2obj must be called on an Array');
	  }
	
	  /**
	   * Dictionary of default options
	   * @type {Object}
	   */
	  var defaults = {
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
	  var settings = (0, _isPlainObject2.default)(options) ? (0, _extend2.default)({}, defaults, options) : (0, _extend2.default)({}, defaults);
	
	  // Extract data from `settings` into dinstict variables.
	  var key = settings.key,
	      keyPrefix = settings.keyPrefix,
	      keySuffix = settings.keySuffix,
	      deleteKey = settings.deleteKey,
	      inheritProto = settings.inheritProto;
	
	  // Failsafe if `keyPrefix` or `keySuffix` are not strings.
	
	  keyPrefix = (0, _isString2.default)(keyPrefix) ? keyPrefix : '';
	  keySuffix = (0, _isString2.default)(keySuffix) ? keySuffix : '';
	
	  /**
	   * The converted result object
	   * @type {Object}
	   */
	  var converted = array.reduce(function (accum, current, index) {
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
	
	exports.default = arr2obj;
	module.exports = exports['default'];

/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = isArray;
	/**
	 * Checks if 'value' is array.
	 *
	 * @param {*} value The value to check if is array.
	 * @return {Boolean} True if array, else false.
	 * @example
	 *
	 * isArray(['a', 'b', 'c', 'd']);
	 * // -> true
	 *
	 * isArray(100);
	 * // -> false
	 *
	 * isArray('Lorem ipsum dolor sit amet');
	 * // -> false
	 *
	 * isArray({ a: 'a', b: 'b' });
	 * // -> false
	 */
	function isArray(value) {
	  return Array.isArray ? Array.isArray(value) : Object.prototype.toString.call(value) === '[object Array]';
	}
	module.exports = exports['default'];

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = isPlainObject;
	/**
	 * Checks if `value` is a plain object (created using "{}" or "new Object").
	 *
	 * @NOTE Use with caution as host objects (or objects used by browser host environments to complete the execution environment of ECMAScript) have a number of inconsistencies which are difficult to robustly feature detect cross-platform.
	 * @param {*} value The value to check.
	 * @return {Boolean} True if `value` is a plain object, else false.
	 * @example
	 *
	 * function Foo() {
	 *   this.a = 1;
	 * }
	 *
	 * isPlainObject({});
	 * // -> true
	 *
	 * isPlainObject({foo: 'bar'});
	 * // -> true
	 *
	 * isPlainObject(new Object({foo: 'bar'}));
	 * // -> true
	 *
	 * isPlainObject(new Foo());
	 * // -> false
	 *
	 * isPlainObject(Object.create(null));
	 * // -> true
	 *
	 * isPlainObject(Object.create({}));
	 * // -> false
	 *
	 * isPlainObject(Object.create({foo: 'bar'}));
	 * // -> false
	 *
	 * isPlainObject([1, 2, 3]);
	 * // -> false
	 *
	 * isPlainObject(null);
	 * // -> false
	 *
	 * isPlainObject();
	 * // -> false
	 *
	 * isPlainObject(100);
	 * // -> false
	 *
	 * isPlainObject('lorem ipsum');
	 * // -> false
	 */
	
	function isPlainObject(value) {
	  var hasOwn = {}.hasOwnProperty;
	  var toString = {}.toString;
	
	  // Detect obvious negatives.
	  // Use toString to catch host objects.
	  if (!value || toString.call(value) !== '[object Object]') {
	    return false;
	  }
	
	  var proto = Object.getPrototypeOf(value);
	
	  // Objects with no prototype (e.g., `Object.create(null)`) are plain.
	  if (!proto) {
	    return true;
	  }
	
	  // Objects with prototype are plain if they were constructed by a global Object function.
	  var ctor = hasOwn.call(proto, 'constructor') && proto.constructor;
	  return typeof ctor === 'function' && hasOwn.toString.call(ctor) === hasOwn.toString.call(Object);
	}
	module.exports = exports['default'];

/***/ },
/* 3 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = isString;
	/**
	 * Checks if `value` is string.
	 *
	 * @param {*} value The value to check if is string.
	 * @return {Boolean} True if string, else false.
	 * @example
	 *
	 * isString(['a', 'b', 'c', 'd']);
	 * // -> false
	 *
	 * isString(100);
	 * // -> false
	 *
	 * isString('Lorem ipsum dolor sit amet');
	 * // -> true
	 *
	 * isString({ a: 'a', b: 'b' });
	 * // -> false
	 */
	function isString(value) {
	  return !!value && Object.prototype.toString.call(value) === '[object String]';
	}
	module.exports = exports['default'];

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
	exports.default = extend;
	
	var _isPlainObject = __webpack_require__(2);
	
	var _isPlainObject2 = _interopRequireDefault(_isPlainObject);
	
	var _isArray = __webpack_require__(1);
	
	var _isArray2 = _interopRequireDefault(_isArray);
	
	var _isFunction = __webpack_require__(5);
	
	var _isFunction2 = _interopRequireDefault(_isFunction);
	
	var _isBoolean = __webpack_require__(6);
	
	var _isBoolean2 = _interopRequireDefault(_isBoolean);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/**
	 * Merge the contents of two or more objects together into the first object.
	 *
	 * Keep in mind that the target object (first argument) will be modified, and will also be returned from `extend()`.
	 * If, however, you want to preserve both of the original objects, you can do so by passing an empty object as the target:
	 *
	 * `var object = extend({}, object1, object2);`
	 *
	 * The merge performed by `extend()` is not recursive by default; if a property of the first object
	 * is itself an object or array, it will be completely overwritten by a property with the same key
	 * in the second or subsequent object. The values are not merged.
	 * However, by passing true for the first function argument, objects will be recursively merged.
	 *
	 * **Warning:** Passing false for the first argument is not supported.
	 *
	 * Undefined properties are not copied. However, properties inherited from the object's prototype will be copied over.
	 * Properties that are an object constructed via new MyCustomObject(args), or built-in JavaScript types such as
	 * Date or RegExp, are not re-constructed and will appear as plain Objects in the resulting object or array.
	 *
	 * On a deep extend, Object and Array are extended, but object wrappers on primitive types such as
	 * String, Boolean, and Number are not. Deep-extending a cyclical data structure will result in an error.
	 *
	 * @function extend
	 * @param {Boolean} [deep=false] If true, the merge becomes recursive (aka. deep copy).
	 * @param {Object} target An object that will receive the new properties if additional objects are passed.
	 * @param {Object} object1 An object containing additional properties to merge in.
	 * @param {Object} [objectN] Additional objects containing properties to merge in.
	 * @return {Object} The merged object.
	 * @example
	 *
	 * // EXAMPLE 1
	 * // Merge two objects, modifying the first.
	 * var object1 = {
	 *   apple: 0,
	 *   banana: {weight: 52, price: 100},
	 *   cherry: 97
	 * };
	 *
	 * var object2 = {
	 *   banana: {price: 200},
	 *   durian: 100
	 * };
	 *
	 * extend(object1, object2);
	 * // -> {"apple": 0, "banana": {"price": 200}, "cherry": 97, "durian": 100}
	 *
	 * // EXAMPLE 2
	 * // Merge two objects recursively, modifying the first.
	 * var object1 = {
	 *   apple: 0,
	 *   banana: {weight: 52, price: 100},
	 *   cherry: 97
	 * };
	 * var object2 = {
	 *   banana: {price: 200},
	 *   durian: 100
	 * };
	 *
	 * extend(true, object1, object2);
	 * // -> {"apple": 0, "banana": {"weight": 52, "price": 200}, "cherry": 97, "durian": 100}
	 *
	 * // EXAMPLE 3
	 * // Merge defaults and options, without modifying the defaults.
	 * var defaults = {validate: false, limit: 5, name: "foo"};
	 * var options = {validate: true, name: "bar"};
	 *
	 * // Merge defaults and options, without modifying defaults
	 * var settings = extend({}, defaults, options);
	 *
	 * // -> defaults -- {"validate": false, "limit": 5, "name": "foo"}
	 * // -> options -- {"validate": true, "name": "bar"}
	 * // -> settings -- {"validate": true, "limit": 5, "name": "bar"}
	 */
	function extend() {
	  var length = arguments.length;
	  var options = void 0,
	      name = void 0,
	      src = void 0,
	      copy = void 0,
	      copyIsArray = void 0,
	      clone = void 0;
	  var target = (arguments.length <= 0 ? undefined : arguments[0]) || {};
	  var i = 1;
	  var deep = false;
	
	  // Handle a deep copy situation
	  if ((0, _isBoolean2.default)(target)) {
	    deep = target;
	    target = (arguments.length <= 1 ? undefined : arguments[1]) || {};
	    // skip the boolean and the target
	    i = 2;
	  }
	
	  // Handle case when target is a string or something (possible in deep copy)
	  if ((typeof target === 'undefined' ? 'undefined' : _typeof(target)) !== 'object' && !(0, _isFunction2.default)(target)) {
	    target = {};
	  }
	
	  for (; i < length; i += 1) {
	    // Only deal with non-null/undefined values
	    if ((options = arguments.length <= i ? undefined : arguments[i]) != null) {
	      // Extend the base object
	      for (name in options) {
	        src = target[name];
	        copy = options[name];
	
	        // Prevent never-ending loop
	        if (target === copy) {
	          continue;
	        }
	
	        // Recurse if we're merging plain objects or arrays
	        if (deep && copy && ((0, _isPlainObject2.default)(copy) || (copyIsArray = (0, _isArray2.default)(copy)))) {
	          if (copyIsArray) {
	            copyIsArray = false;
	            clone = src && (0, _isArray2.default)(src) ? src : [];
	          } else {
	            clone = src && (0, _isPlainObject2.default)(src) ? src : {};
	          }
	
	          // Never move original objects, clone them
	          target[name] = extend(deep, clone, copy);
	
	          // Don't bring in undefined values
	        } else if (typeof copy !== 'undefined') {
	          target[name] = copy;
	        }
	      }
	    }
	  }
	
	  // Return the modified object
	  return target;
	}
	module.exports = exports['default'];

/***/ },
/* 5 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = isFunction;
	/**
	 * Checks if 'value' is a function.
	 *
	 * @param {*} value The value to check.
	 * @return {Boolean} True if 'value' is a function, else returns false.
	 * @example
	 *
	 * isFunction(function test() {
	 *   return 'This is test function.';
	 * });
	 * // -> true
	 *
	 * isFunction('This is a test function.');
	 * // -> false
	 */
	function isFunction(value) {
	  return typeof value === 'function' && Object.prototype.toString.call(value) === '[object Function]';
	}
	module.exports = exports['default'];

/***/ },
/* 6 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = isBoolean;
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
	function isBoolean(value) {
	  return value === true || value === false || Object.prototype.toString.call(value) === '[object Boolean]';
	}
	module.exports = exports['default'];

/***/ }
/******/ ])
});
;
//# sourceMappingURL=arr2obj.js.map