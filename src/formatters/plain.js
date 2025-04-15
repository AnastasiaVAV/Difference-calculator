import _ from 'lodash';

const formatValue = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }
  return typeof value === 'string'
    ? `'${value}'`
    : value;
};

const plain = (obj, path = '') => Object
  .entries(obj)
  .map(([key, node]) => {
    const currentPath = path ? `${path}.${key}` : key;
    let value = '';
    switch (node.type) {
      case 'added':
        value = ` with value: ${formatValue(node.value)}`;
        break;
      case 'removed':
        break;
      case 'updated':
        value = `. From ${formatValue(node.valueOld)} to ${formatValue(node.valueNew)}`;
        break;
      default:
        return _.isObject(node.value) ? plain(node.value, currentPath) : '';
    }
    return `Property '${currentPath}' was ${node.type}${value}`;
  })
  .filter(Boolean)
  .join('\n');

export default plain;
