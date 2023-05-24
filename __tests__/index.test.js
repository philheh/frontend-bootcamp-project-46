import fs from 'fs';
import { test, expect } from '@jest/globals';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import diff from '../index.js';
import parse from '../src/parser.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (name) => path.join(__dirname, '..', '__fixtures__', name);
const readFile = (name) => fs.readFileSync(getFixturePath(name), 'utf-8');

const testData = readFile('diffFile1File2.txt');
const nestedData = readFile('diffnested1nested2.txt');
const plainData = readFile('diffPlain.txt');
const jsonData = readFile('diffJSON.txt');

test('gendiff JSON', () => {
  expect(diff(getFixturePath('plainFile1.json'), getFixturePath('plainFile2.json'))).toEqual(testData);
});

test('gendiff YML', () => {
  expect(diff(getFixturePath('file1.yml'), getFixturePath('file2.yml'))).toEqual(testData);
});

test('gendiff NESTED JSON', () => {
  expect(diff(getFixturePath('nestedFile1.json'), getFixturePath('nestedFile2.json'))).toEqual(nestedData);
});

test('gendiff NESTED YAML', () => {
  expect(diff(getFixturePath('nestedYAML1.yml'), getFixturePath('nestedYAML2.yml'))).toEqual(nestedData);
});

test('gendiff PLAIN', () => {
  expect(diff(getFixturePath('nestedFile1.json'), getFixturePath('nestedFile2.json'), 'plain')).toEqual(plainData);
});

test('gendiff JSON', () => {
  expect(diff(getFixturePath('nestedFile1.json'), getFixturePath('nestedFile2.json'), 'json')).toEqual(jsonData);
});

test('parser', () => {
  expect(parse(testData, '.txt')).toEqual(null);
});
