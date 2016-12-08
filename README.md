# arr2obj

[![Build Status](https://travis-ci.org/georapbox/arr2obj.svg?branch=master)](https://travis-ci.org/georapbox/arr2obj) [![Dependencies](https://david-dm.org/georapbox/arr2obj.svg?theme=shields.io)](https://david-dm.org/georapbox/arr2obj) [![devDependency Status](https://david-dm.org/georapbox/arr2obj/dev-status.svg)](https://david-dm.org/georapbox/arr2obj#info=devDependencies)

## Install
```bash
$ npm install arr2obj
```

## arr2obj(array, [options]) ⇒ <code>Object</code>

Converts an array of primitives or objects to a plain object.

**Returns**: <code>Object</code> - The converted object.  
**Throws**:

- <code>TypeError</code> Will throw if `array` is not an Array.


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| array | <code>Array</code> |  | The initial array to convert. |
| [options] | <code>Object</code> |  | User defined options to override defaults. |
| [options.key] | <code>String</code> |  | If `array` is an array of objects and each object has a property with the value of `key`, use those as the properties of the result object. By default the index of each item in array is used. |
| [options.keyPrefix] | <code>String</code> | <code>&#x27;&#x27;</code> | A string that prefixes the keys of the result object. If anything than string is provided, it takes the default value (''). |
| [options.keySuffix] | <code>String</code> | <code>&#x27;&#x27;</code> | A string that suffixes the keys of the result object. If anything than string is provided, it takes the default value (''). |
| [options.deleteKey] | <code>Boolean</code> | <code>false</code> | Deletes the property of each item of the result object if `key` is specified and exists in current object. If `key` does not exist in current item or current item is not an object, leaves the property as is. |
| [options.inheritProto] | <code>Boolean</code> | <code>false</code> | Determines if the result object should inherit from the `Object.prototype`. |

**Example**  
```js
const objectsArray = [
  {_id: 'u0', name: 'John Doe', job: 'Frontend Developer'},
  {_id: 'u1', name: 'Albert Brown', job: 'Designer'},
  {_id: 'u2', name: 'Stuart Chalmers', job: 'Product Manager'},
  {_id: 'u3', name: 'Alberta Jonson', job: 'Account Manager'}
];

const stringsArray = ['orange', 'banana', 'apple', 'cherry'];

const mixedArray = [
  {_id: 'u0', name: 'John Doe', job: 'Frontend Developer'},
  ['orange', 'banana', 'apple', 'cherry'],
  'Just a string'
];

// Convert an array of objects using the "_id" property as key of the result object, prefixed with "$" character.
arr2obj(objectsArray, {
  key: '_id',
  keyPrefix: '$'
});
// -> {
// ->   '$u0': { _id: 'u0', name: 'John Doe', job: 'Frontend Developer' },
// ->   '$u1': { _id: 'u1', name: 'Albert Brown', job: 'Designer' },
// ->   '$u2': { _id: 'u2', name: 'Stuart Chalmers', job: 'Product Manager' },
// ->   '$u3': { _id: 'u3', name: 'Alberta Jonson', job: 'Account Manager' }
// -> }

// Convert an array of objects using the "_id" property as key of the result object, and delete it from the result object.
arr2obj(objectsArray, {
  key: '_id',
  deleteKey: true
});
// -> {
// ->   'u0': { name: 'John Doe', job: 'Frontend Developer' },
// ->   'u1': { name: 'Albert Brown', job: 'Designer' },
// ->   'u2': { name: 'Stuart Chalmers', job: 'Product Manager' },
// ->   'u3': { name: 'Alberta Jonson', job: 'Account Manager' }
// -> }

// Convert an array of strings with default options.
arr2obj(stringsArray);
// -> { '0': 'orange', '1': 'banana', '2': 'apple', '3': 'cherry' }

// Convert an array of strings prefixing and suffixing the keys with "_" character.
arr2obj(stringsArray, {
  keyPrefix: '_',
  keySuffix: '_'
});
// -> { '_0_': 'orange', '_1_': 'banana', '_2_': 'apple', '_3_': 'cherry' }

// Convert an array of mixed types using the "_id" property as key of the result object.
arr2obj(mixedArray, {
  key: '_id'
});
// -> {
// ->   '1': [ 'orange', 'banana', 'apple', 'cherry' ],
// ->   '2': 'Just a string',
// ->   u0: { _id: 'u0', name: 'John Doe', job: 'Frontend Developer' }
// -> }
```

## Build for development
```bash
$ npm run dev
```

## Build for production
```bash
$ npm run build
```

## Test

```bash
$ npm test
```
