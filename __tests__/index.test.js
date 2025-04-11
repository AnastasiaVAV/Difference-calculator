import { fileURLToPath } from 'url';
import { dirname } from 'path';
import gendiff from '../index.js';
import fs from 'fs';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (name) => path.join(__dirname, '..', '__fixtures__', name);
const getRelativeFixturePath = (name) => path.join('__fixtures__', name);
const readFixtureFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

const formats = ['json', 'yml'];
let expected;
let absoluteFilepath1;
let absoluteFilepath2;
let relativeFilepath1;
let relativeFilepath2;

beforeAll(() => {
  expected = readFixtureFile('result.txt');
});

test.each(formats)('absolute path (%s)', (format) => {
  absoluteFilepath1 = getFixturePath(`file1.${format}`);
  absoluteFilepath2 = getFixturePath(`file2.${format}`);
  expect(gendiff(absoluteFilepath1, absoluteFilepath2)).toEqual(expected);
});

test.each(formats)('relative path (%s)', (format) => {
  relativeFilepath1 = getRelativeFixturePath(`file1.${format}`);
  relativeFilepath2 = getRelativeFixturePath(`file2.${format}`);
  expect(gendiff(relativeFilepath1, relativeFilepath2)).toEqual(expected);
});
