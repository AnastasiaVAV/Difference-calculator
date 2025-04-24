import path from 'path';
import fs from 'fs';
import gendiff from '../src/index.js';

const getFixturePath = name => path.join('__fixtures__', name);
const readFixtureFile = filename => fs.readFileSync(getFixturePath(filename), 'utf-8');

const filesFormats = ['json', 'yml', 'yaml'];

const expectedStylish = readFixtureFile('result_stylish.txt');
const expectedPlain = readFixtureFile('result_plain.txt');
const expectedJson = readFixtureFile('result_json.txt');

test.each(filesFormats)('relative path (%s)', (format) => {
  const relativeFilepath1 = getFixturePath(`file1.${format}`);
  const relativeFilepath2 = getFixturePath(`file2.${format}`);
  expect(gendiff(relativeFilepath1, relativeFilepath2)).toEqual(expectedStylish);
  expect(gendiff(relativeFilepath1, relativeFilepath2, 'stylish')).toEqual(expectedStylish);
  expect(gendiff(relativeFilepath1, relativeFilepath2, 'plain')).toEqual(expectedPlain);
  expect(gendiff(relativeFilepath1, relativeFilepath2, 'json')).toEqual(expectedJson);
});
