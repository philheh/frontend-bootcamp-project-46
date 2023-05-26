import fs from 'fs';
import path from 'path';
import parse from './parser.js';
import objectComparator from './compareObjects.js';
import formatter from './formatters/index.js';

const readFile = (pathToFile) => fs.readFileSync(pathToFile, 'utf-8');

const diff = (filepath1, filepath2, format = 'stylish') => {
  const fileContents1 = readFile(filepath1);
  const fileContents2 = readFile(filepath2);

  const format1 = path.extname(filepath1).slice(1);
  const format2 = path.extname(filepath2).slice(1);

  const data1 = parse(fileContents1, format1);
  const data2 = parse(fileContents2, format2);

  const comparedObjects = objectComparator(data1, data2);
  const formattedDiff = formatter(comparedObjects, format);
  return formattedDiff;
};

export default diff;
