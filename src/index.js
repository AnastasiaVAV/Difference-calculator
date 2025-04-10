import _ from 'lodash';
import parse from './parse.js';

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
      let mapKey;
      if (!Object.hasOwn(parseFile1, key)) {
        mapKey = `+ ${key}: ${propertyFile2}\n`;
      } else if (!Object.hasOwn(parseFile2, key)) {
        mapKey = `- ${key}: ${propertyFile1}\n`;
      } else if (propertyFile1 === propertyFile2) {
        mapKey = `  ${key}: ${propertyFile1}\n`;
      } else {
        mapKey = `- ${key}: ${propertyFile1}\n+ ${key}: ${propertyFile2}\n`;
      }
      return mapKey;
    })
    .join('');
  return `{\n${diff}}`;
};

export default gendiff;
