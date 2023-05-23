import fs from 'fs';
import path from 'path';
import parse from './src/parser.js';
import objectComparator from './src/compareObjects.js';
import stylish from './src/formatter/stylish.js';

const readFile = (pathToFile) => fs.readFileSync(pathToFile, 'utf-8');

const diff = (filepath1, filepath2) => {
  const fileContents1 = readFile(filepath1);
  const fileContents2 = readFile(filepath2);
  const format1 = path.extname(filepath1);
  const format2 = path.extname(filepath2);
  const data1 = parse(fileContents1, format1);
  const data2 = parse(fileContents2, format2);
  const comparedObjects = objectComparator(data1, data2);
  // console.log(JSON.stringify(comparedObjects));
  const formatted = stylish(comparedObjects);
  return formatted;
};

export default diff;
