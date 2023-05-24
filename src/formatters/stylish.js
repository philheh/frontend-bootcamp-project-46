import _ from 'lodash';

const prefixes = {
  added: '+',
  removed: '-',
  unchanged: ' ',
  nested: '  ',
};
const spaces = 4;
const blankSpace = ' ';

const stringify = (value, depth) => {
  if (!_.isObject(value)) {
    return `${value}`;
  }
  const indentSize = depth * spaces;
  const keyIndent = blankSpace.repeat(indentSize);
  const bracketIndent = blankSpace.repeat(indentSize - spaces);
  const lines = Object.entries(value).map(
    ([key, val]) => `${keyIndent}${key}: ${stringify(val, depth + 1)}`,
  );
  return ['{', ...lines, `${bracketIndent}}`].join('\n');
};

const addPrefix = (keyIndent, prefix) => `${blankSpace.repeat(keyIndent)}${prefixes[prefix]}`;

const stylish = (coll) => {
  const iter = (tree, depth) => {
    const result = tree.map((node) => {
      const keyIndent = depth * spaces - 2;
      switch (node.status) {
        case 'nested':
          return `${addPrefix(keyIndent, node.status)}${node.key}: {${iter(node.value, depth + 1)}\n ${blankSpace.repeat(keyIndent + 1)}}`;
        case 'removed':
          return `${addPrefix(keyIndent, node.status)} ${node.key}: ${stringify(node.value, depth + 1)}`;
        case 'added':
          return `${addPrefix(keyIndent, node.status)} ${node.key}: ${stringify(node.value, depth + 1)}`;
        case 'changed':
          return `${addPrefix(keyIndent, 'removed')} ${node.key}: ${stringify(node.oldValue, depth + 1)}\n${addPrefix(keyIndent, 'added')} ${node.key}: ${stringify(node.newValue, depth + 1)}`;
        default:
          return `${addPrefix(keyIndent, node.status)} ${node.key}: ${stringify(node.value, depth + 1)}`;
      }
    });
    return `\n${result.join('\n')}`;
  };
  return `{${iter(coll, 1)}\n}`;
};

export default stylish;
