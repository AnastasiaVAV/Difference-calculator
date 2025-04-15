import { fileURLToPath } from 'url';
import { dirname } from 'path';
import gendiff from '../index.js';
import fs from 'fs';
import path from 'path';
import formatter from '../src/formatters/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (name) => path.join(__dirname, '..', '__fixtures__', name);
const getRelativeFixturePath = (name) => path.join('__fixtures__', name);
const readFixtureFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

const formats = ['json', 'yml', 'yaml'];
let absoluteFilepath1;
let absoluteFilepath2;
let relativeFilepath1;
let relativeFilepath2;
let diff;
let expectedStylish;
let expectedPlain;

beforeAll(() => {
  expectedStylish = readFixtureFile('result_stylish.txt');
  expectedPlain = readFixtureFile('result_plain.txt');
});

test.each(formats)('absolute path (%s)', (format) => {
  absoluteFilepath1 = getFixturePath(`file1.${format}`);
  absoluteFilepath2 = getFixturePath(`file2.${format}`);
  diff = gendiff(absoluteFilepath1, absoluteFilepath2);
  expect(formatter(diff)).toEqual(expectedStylish);
  expect(formatter(diff, 'plain')).toEqual(expectedPlain);
});

test.each(formats)('relative path (%s)', (format) => {
  relativeFilepath1 = getRelativeFixturePath(`file1.${format}`);
  relativeFilepath2 = getRelativeFixturePath(`file2.${format}`);
  diff = gendiff(relativeFilepath1, relativeFilepath2);
  expect(formatter(diff)).toEqual(expectedStylish);
  expect(formatter(diff, 'plain')).toEqual(expectedPlain);
});
