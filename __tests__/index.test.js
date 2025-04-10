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

let expected;
let absoluteFilepath1;
let absoluteFilepath2;
let relativeFilepath1;
let relativeFilepath2;
beforeAll(() => {
  absoluteFilepath1 = getFixturePath('file1.json');
  absoluteFilepath2 = getFixturePath('file2.json');
  relativeFilepath1 = getRelativeFixturePath('file1.json');
  relativeFilepath2 = getRelativeFixturePath('file2.json');
  expected = readFixtureFile('result_flat-json-files.txt');
});

test('absolute path', () => {
  expect(gendiff(absoluteFilepath1, absoluteFilepath2)).toEqual(expected);
});

test('relative path', () => {
  expect(gendiff(relativeFilepath1, relativeFilepath2)).toEqual(expected);
});
