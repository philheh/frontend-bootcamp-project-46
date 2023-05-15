import _ from 'lodash';
import fs from 'fs';

const diff = (filepath1, filepath2) => {
  const fileContents1 = fs.readFileSync(filepath1, 'utf8');
  const fileContents2 = fs.readFileSync(filepath2, 'utf8');
  const data1 = JSON.parse(fileContents1);
  const data2 = JSON.parse(fileContents2);

  const result = [];
  const keys = _.union(_.keys(data1), _.keys(data2)).sort();
  keys.map((key) => {
    if (!_.has(data2, key)) {
      result.push(`- ${key}: ${data1[key]}`);
    } else if (!_.has(data1, key)) {
      result.push(`+ ${key}: ${data2[key]}`);
    } else if (!_.isEqual(data1[key], data2[key])) {
      result.push(`- ${key}: ${data1[key]}`);
      result.push(`+ ${key}: ${data2[key]}`);
    } else {
      result.push(`  ${key}: ${data1[key]}`);
    }
  });
  result.unshift('{');
  result.push('}');
  return result.join('\n');
};

export default diff;
