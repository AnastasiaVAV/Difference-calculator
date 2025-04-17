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
      const currentPath = path ? `${path}.${node.name}` : node.name;
      const firstPart = `Property '${currentPath}' was ${node.type}`;
      switch (node.type) {
        case 'added':
          return `${firstPart} with value: ${formatValue(node.value)}`;
        case 'removed':
          return `${firstPart}`;
        case 'updated':
          return `${firstPart}. From ${formatValue(node.oldValue)} to ${formatValue(node.newValue)}`;
        case 'nested':
          return iter(node.children, currentPath);
        default:
          return [];
      }
    })
    .join('\n');
  return iter(tree, '');
};

export default plain;

// const plain = (obj, path = '') => Object
//   .entries(obj)
//   .map(([key, node]) => {
//     const currentPath = path ? `${path}.${key}` : key;
//     const firstPart = `Property '${currentPath}' was ${node.type}`;
//     switch (node.type) {
//       case 'added':
//         return `${firstPart} with value: ${formatValue(node.value)}`;
//       case 'removed':
//         return `${firstPart}`;
//       case 'updated':
//         return `${firstPart}. From ${formatValue(node.valueOld)} to ${formatValue(node.valueNew)}`;
//       default:
//         return _.isObject(node.value) ? plain(node.value, currentPath) : '';
//     }
//   })
//   .filter(Boolean)
//   .join('\n');

// export default plain;
