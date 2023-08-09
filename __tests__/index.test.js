import fs from 'fs';
import { fileURLToPath } from 'url';
import { test, expect, describe } from '@jest/globals';
import path, { dirname } from 'path';
import diff from '../src/index.js';
import parse from '../src/parser.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (name) => path.join(__dirname, '..', '__fixtures__', name);
const readFile = (name) => fs.readFileSync(getFixturePath(name), 'utf-8');

const testData = readFile('diffFile1File2.txt');
const nestedData = readFile('diffnested1nested2.txt');
const plainData = readFile('diffPlain.txt');
const jsonData = readFile('diffJSON.txt');

const filesData = [
  ['plainFile1.json', 'plainFile2.json', testData],
  ['file1.yml', 'file2.yml', testData],
  ['nestedFile1.json', 'nestedFile2.json', nestedData],
  ['nestedYAML1.yml', 'nestedYAML2.yml', nestedData],
  ['nestedFile1.json', 'nestedFile2.json', plainData, 'plain'],
  ['nestedFile1.json', 'nestedFile2.json', jsonData, 'json'],
];

describe.each(filesData)('gendiff test', (file1, file2, expected, format) => {
  test(`compare ${file1} with ${file2} using ${format || 'default'} format`, () => {
    expect(diff(getFixturePath(file1), getFixturePath(file2), format)).toEqual(expected);
  });
});

test('parser', () => {
  expect(parse(testData, '.txt')).toEqual(null);
});
