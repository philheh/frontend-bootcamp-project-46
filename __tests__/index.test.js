import fs from 'fs';
import { test, expect } from '@jest/globals';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import diff from '../index.js';
import parse from '../parser.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (name) => path.join(__dirname, '..', '__fixtures__', name);
const readFile = (name) => fs.readFileSync(getFixturePath(name), 'utf-8');

const testData = readFile('diffFile1File2.txt');

test('gendiff JSON', () => {
  expect(diff(getFixturePath('file1.json'), getFixturePath('file2.json'))).toEqual(testData);
});

test('gendiff YML', () => {
  expect(diff(getFixturePath('file1.yml'), getFixturePath('file2.yml'))).toEqual(testData);
});

test('parser', () => {
  expect(parse(testData, '.txt')).toEqual(null);
});
