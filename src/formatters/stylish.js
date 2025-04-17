import _ from 'lodash';

const replacer = ' ';
const spacesCount = 4;
const leftShift = 2;

export default (tree) => {
  const iter = (currentNode, depth) => {
    if (!_.isObject(currentNode)) {
      return `${currentNode}`;
    }
    const indentSize = (depth * spacesCount) - leftShift;
    const currentIndent = replacer.repeat(indentSize);
    const bracketIndent = indentSize > spacesCount ? replacer.repeat((indentSize - spacesCount) + leftShift) : '';

    if (!Array.isArray(currentNode)) {
      const lines = Object
        .entries(currentNode)
        .map(([key, val]) => `${currentIndent}  ${key}: ${iter(val, depth + 1)}`);
      return `{\n${lines.join('\n')}\n${bracketIndent}} `;
    }
    const lines = currentNode.map((node) => {
      switch (node.type) {
        case 'added':
          return `${currentIndent}+ ${node.name}: ${iter(node.value, depth + 1)}`;
        case 'removed':
          return `${currentIndent}- ${node.name}: ${iter(node.value, depth + 1)}`;
        case 'updated':
          return `${currentIndent}- ${node.name}: ${iter(node.oldValue, depth + 1)}\n${currentIndent}+ ${node.name}: ${iter(node.newValue, depth + 1)}`;
        case 'nested':
          return `${currentIndent}  ${node.name}: ${iter(node.children, depth + 1)}`;
        case 'unchanged':
          return `${currentIndent}  ${node.name}: ${iter(node.value, depth + 1)}`;
        default:
          return '';
      }
    });
    return `{\n${lines.join('\n')}\n${bracketIndent}}`;
  };
  return iter(tree, 1);
};
