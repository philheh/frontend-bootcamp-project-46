import _ from 'lodash';

const stringify = (value) => {
  if (_.isPlainObject(value)) {
    return '[complex value]';
  } if (typeof value === 'string') {
    return `'${value}'`;
  }
  return `${value}`;
};

const plain = (data) => {
  const iter = (tree, ancestry) => {
    const result = tree.flatMap((node) => {
      const path = ancestry === '' ? node.key : `${ancestry}.${node.key}`;
      switch (node.status) {
        case 'added':
          return `Property '${path}' was added with value: ${stringify(
            node.value,
          )}`;
        case 'removed':
          return `Property '${path}' was removed`;
        case 'changed':
          return `Property '${path}' was updated. From ${stringify(
            node.oldValue,
          )} to ${stringify(node.newValue)}`;
        case 'nested':
          return iter(node.value, path);
        case 'unchanged':
          return null;
        default:
          throw new Error('OSHIBKA');
      }
    });
    return result.filter((sentence) => sentence).join('\n');
  };
  return iter(data, '');
};

export default plain;
