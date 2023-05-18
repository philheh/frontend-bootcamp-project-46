import _ from 'lodash';
import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';

const prefixes = {
  added: '+',
  removed: '-',
  unchanged: ' ',
};

const readFile = (pathToFile) => fs.readFileSync(pathToFile, 'utf-8');

const parse = (file, format) => {
  if (format === '.json') {
    return JSON.parse(file);
  }
  if (format === '.yml' || format === '.yaml') {
    return yaml.load(file);
  }
  return null;
};

const convertToString = (coll) => {
  const result = coll.map((item) => {
    switch (item.status) {
      case 'removed':
        return `${prefixes.removed} ${item.key}: ${item.value}`;
      case 'added':
        return `${prefixes.added} ${item.key}: ${item.value}`;
      case 'changed':
        return `${prefixes.removed} ${item.key}: ${item.oldValue}\n${prefixes.added} ${item.key}: ${item.newValue}`;
      default:
        return `${prefixes.unchanged} ${item.key}: ${item.value}`;
    }
  });
  result.unshift('{');
  result.push('}');
  return result.join('\n');
};

const diff = (filepath1, filepath2) => {
  console.log(filepath1, filepath2);
  const fileContents1 = readFile(filepath1);
  const fileContents2 = readFile(filepath2);
  const format1 = path.extname(filepath1);
  const format2 = path.extname(filepath2);
  const data1 = parse(fileContents1, format1);
  const data2 = parse(fileContents2, format2);
  const keys = _.union(_.keys(data1), _.keys(data2)).sort();
  const mappedKeys = keys.map((key) => {
    if (!_.has(data2, key)) {
      return {
        key,
        value: data1[key],
        status: 'removed',
      };
    }
    if (!_.has(data1, key)) {
      return {
        key,
        value: data2[key],
        status: 'added',
      };
    }
    if (!_.isEqual(data1[key], data2[key])) {
      return {
        key,
        oldValue: data1[key],
        newValue: data2[key],
        status: 'changed',
      };
    }
    return {
      key,
      value: data1[key],
      status: 'unchanged',
    };
  });

  return convertToString(mappedKeys);
};

export default diff;
