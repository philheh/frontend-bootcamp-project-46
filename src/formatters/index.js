import stylish from './stylish.js';
import plain from './plain.js';

const formatter = (data, format) => {
  if (format === 'stylish') {
    return stylish(data);
  }
  if (format === 'plain') {
    return plain(data);
  }
  if (format === 'json') {
    return JSON.stringify(data);
  }
  throw new Error('not supported format');
};

export default formatter;
