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

const filesFormats = ['json', 'yml', 'yaml'];
// const formatters = ['stylish', 'plain', 'json'];
let absoluteFilepath1;
let absoluteFilepath2;
let relativeFilepath1;
let relativeFilepath2;
// let diff;
let expectedStylish;
let expectedPlain;
let expectedJson;

beforeAll(() => {
  expectedStylish = readFixtureFile('result_stylish.txt');
  expectedPlain = readFixtureFile('result_plain.txt');
  expectedJson = readFixtureFile('result_json.txt');
});

test.each(filesFormats)('absolute path (%s)', (format) => {
  absoluteFilepath1 = getFixturePath(`file1.${format}`);
  absoluteFilepath2 = getFixturePath(`file2.${format}`);
  // diff = gendiff(absoluteFilepath1, absoluteFilepath2);
  // expect(formatter(diff)).toEqual(expectedStylish);
  // expect(formatter(diff, 'stylish')).toEqual(expectedStylish);
  // expect(formatter(diff, 'plain')).toEqual(expectedPlain);
  // expect(formatter(diff, 'json')).toEqual(expectedJson);
  expect(gendiff(absoluteFilepath1, absoluteFilepath2)).toEqual(expectedStylish);
  expect(gendiff(absoluteFilepath1, absoluteFilepath2, 'stylish')).toEqual(expectedStylish);
  expect(gendiff(absoluteFilepath1, absoluteFilepath2, 'plain')).toEqual(expectedPlain);
  expect(gendiff(absoluteFilepath1, absoluteFilepath2, 'json')).toEqual(expectedJson);
});

test.each(filesFormats)('relative path (%s)', (format) => {
  relativeFilepath1 = getRelativeFixturePath(`file1.${format}`);
  relativeFilepath2 = getRelativeFixturePath(`file2.${format}`);
  // diff = gendiff(relativeFilepath1, relativeFilepath2);
  // expect(formatter(diff)).toEqual(expectedStylish);
  // expect(formatter(diff, 'stylish')).toEqual(expectedStylish);
  // expect(formatter(diff, 'plain')).toEqual(expectedPlain);
  // expect(formatter(diff, 'json')).toEqual(expectedJson);
  expect(gendiff(relativeFilepath1, relativeFilepath2)).toEqual(expectedStylish);
  expect(gendiff(relativeFilepath1, relativeFilepath2, 'stylish')).toEqual(expectedStylish);
  expect(gendiff(relativeFilepath1, relativeFilepath2, 'plain')).toEqual(expectedPlain);
  expect(gendiff(relativeFilepath1, relativeFilepath2, 'json')).toEqual(expectedJson);
});
