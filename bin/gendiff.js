#!/usr/bin/env node
import { program } from 'commander';
// import app from '../src/index.js';
import parse from '../src/parse.js';
import _ from 'lodash';

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference')
  .version('1.0.0')
  .option('-f, --format [type]', 'output format')
  .argument('<filepath1>')
  .argument('<filepath2>')
  .action((filepath1, filepath2) => {
    const parseFile1 = parse(filepath1);
    const parseFile2 = parse(filepath2);
    
    const gendiff = (file1, file2) => {
      const keysFile1 = Object.keys(file1);
      const keysFile2 = Object.keys(file2);
      const sortedKeys = _.union(keysFile1, keysFile2).sort();

      const diff = sortedKeys
        .map((key) => {
          const propertyFile1 = file1[key];
          const propertyFile2 = file2[key];

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
        .join('')
        .trim();
      return '{\n' + diff + '\n}';
    };
    console.log(gendiff(parseFile1, parseFile2));
  })

program.parse(process.argv);