import arr2obj from '../lib/arr2obj';
import chai from 'chai';

const expect = chai.expect;

const objectsArray = [
  {_id: 'u0', name: 'John Doe', job: 'Frontend Developer'},
  {_id: 'u1', name: 'Albert Brown', job: 'Designer'},
  {_id: 'u2', name: 'Stuart Chalmers', job: 'Product Manager'},
  {_id: 'u3', name: 'Alberta Jonson', job: 'Account Manager'}
];

const stringsArray = ['orange', 'banana', 'apple', 'cherry'];

describe('arr2obj', function () {
  it('should return a plain object', () => {
    const res = arr2obj(objectsArray);
    expect(res).to.be.an('object');
  });

  it('should return an object with 4 enumerable properties', () => {
    const res = arr2obj(objectsArray);
    expect(Object.keys(res)).with.length(4);
  });

  it('should return an object with key values from 0 to 3', () => {
    const res = arr2obj(objectsArray);
    expect(res).to.include.keys('0');
    expect(res).to.include.keys('1');
    expect(res).to.include.keys('2');
    expect(res).to.include.keys('3');
  });

  it('should return an object with keys derived from item\'s object prefixed and suffixed with "_" character', () => {
    const res = arr2obj(objectsArray, {
      key: '_id',
      keyPrefix: '_',
      keySuffix: '_'
    });
    expect(res).to.include.keys('_u0_');
    expect(res).to.include.keys('_u1_');
    expect(res).to.include.keys('_u2_');
    expect(res).to.include.keys('_u3_');
  });

  it('should delete the property of the items object', () => {
    const res = arr2obj(objectsArray, {
      key: '_id',
      deleteKey: true
    });
    Object.keys(res).forEach(key => expect(res[key]._id).to.not.exist);
  });

  it('should return an object that does not inherit from Object.prototype', () => {
    const res = arr2obj(objectsArray, {
      inheritProto: false
    });
    expect(Object.getPrototypeOf(res)).to.be.null;
  });

  it('should return an object that inherits from Object.prototype', () => {
    const res = arr2obj(objectsArray, {
      inheritProto: true
    });
    expect(Object.getPrototypeOf(res)).to.not.be.null;
  });

  it('should throw TypeError if first argument is not an Array', () => {
    expect(arr2obj).to.throw(TypeError);
  });

  it('should use default prefix and suffix if they are not strings', () => {
    const res = arr2obj(stringsArray, {
      keyPrefix: {},
      keySuffix: NaN
    });
    Object.keys(res).forEach((key, index) => expect(key).to.equal(index.toString()));
  });
});
