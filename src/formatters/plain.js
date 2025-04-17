import _ from 'lodash';

const formatValue = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }
  return typeof value === 'string'
    ? `'${value}'`
    : value;
};

const plain = (tree) => {
  const iter = (currentNode, path) => currentNode
    .flatMap((node) => {
      const currentPath = path ? [...path, node.name] : node.name;
      const firstPart = `Property '${currentPath.join('.')}' `;
      switch (node.type) {
        case 'added':
          return `${firstPart}was added with value: ${formatValue(node.value)}`;
        case 'removed':
          return `${firstPart}was removed`;
        case 'updated':
          return `${firstPart}was updated. From ${formatValue(node.oldValue)} to ${formatValue(node.newValue)}`;
        case 'nested':
          return iter(node.children, currentPath);
        default:
          return [];
      }
    })
    .join('\n');
  return iter(tree, []);
};

export default plain;
