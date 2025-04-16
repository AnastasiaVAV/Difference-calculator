import _ from 'lodash';
import parse from './src/parse.js';
import formatter from './src/formatters/index.js';

const buildTree = (obj1, obj2) => {
  const allKeys = _.union(Object.keys(obj1), Object.keys(obj2));

  return allKeys.reduce((acc, key) => {
    const hasKey1 = Object.hasOwn(obj1, key);
    const hasKey2 = Object.hasOwn(obj2, key);
    const value = (() => {
      if (!hasKey1 || !hasKey2) {
        return !hasKey1
          ? { name: key, type: 'added', value: obj2[key] }
          : { name: key, type: 'removed', value: obj1[key] };
      }
      if (_.isObject(obj1[key]) && _.isObject(obj2[key])) {
        return { name: key, type: 'unchanged', value: buildTree(obj1[key], obj2[key]) };
      }

      const isEquality = obj1[key] === obj2[key];
      return isEquality
        ? { name: key, type: 'unchanged', value: obj1[key] }
        : {
          name: key,
          type: 'updated',
          valueOld: obj1[key],
          valueNew: obj2[key],
        };
    })();
    return { ...acc, [key]: value };
  }, {});
};

const sortedObject = (obj) => {
  if (!_.isObject(obj) || obj === null) {
    return obj;
  }
  const sortedKeys = Object.keys(obj).toSorted();
  return sortedKeys.reduce((acc, key) => ({ ...acc, [key]: sortedObject(obj[key]) }), {});
};

const gendiff = (filepath1, filepath2, format) => {
  const parseFile1 = parse(filepath1);
  const parseFile2 = parse(filepath2);
  const tree = sortedObject(buildTree(parseFile1, parseFile2));
  return formatter(tree, format);
};

export default gendiff;
