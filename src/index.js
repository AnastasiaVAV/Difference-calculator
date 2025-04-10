import parse from '../src/parse.js';
import _ from 'lodash';

const gendiff = (filepath1, filepath2) => {
  const parseFile1 = parse(filepath1);
  const parseFile2 = parse(filepath2);
  const keysFile1 = Object.keys(parseFile1);
  const keysFile2 = Object.keys(parseFile2);
  const sortedKeys = _.union(keysFile1, keysFile2).sort();

  const diff = sortedKeys
    .map((key) => {
      const propertyFile1 = parseFile1[key];
      const propertyFile2 = parseFile2[key];

      if (!Object.hasOwn(parseFile1, key)) {
        return `+ ${key}: ${propertyFile2}\n`;
      } else if (!Object.hasOwn(parseFile2, key)) {
        return `- ${key}: ${propertyFile1}\n`;
      } else if (propertyFile1 === propertyFile2) {
        return `  ${key}: ${propertyFile1}\n`;
      } else {
        return `- ${key}: ${propertyFile1}\n+ ${key}: ${propertyFile2}\n`;
      }
    })
    .join('');
  return '{\n' + diff + '}';
};

export default gendiff;
