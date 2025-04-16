import _ from 'lodash';

const statuses = {
  unchanged: '  ',
  added: '+ ',
  removed: '- ',
  updated: '- ',
};

export default (obj) => {
  const replacer = ' ';
  const spacesCount = 4;
  const leftShift = 2;
  const iter = (currentObj, depth) => {
    if (!_.isObject(currentObj)) {
      return `${currentObj}`;
    }
    const indentSize = (depth * spacesCount) - leftShift;
    const currentIndent = replacer.repeat(indentSize);
    const bracketIndent = indentSize > spacesCount
      ? replacer.repeat((indentSize - spacesCount) + leftShift)
      : '';
    const lines = Object
      .entries(currentObj)
      .map(([key, node]) => {
        const nodeStatus = statuses[node.type] || statuses.unchanged;
        const firstPart = `${currentIndent}${nodeStatus}${key}: `;
        const getValue = (value) => iter(value, depth + 1);
        switch (node.type) {
          case 'unchanged':
          case 'added':
          case 'removed':
            return `${firstPart}${getValue(node.value)}`;
          case 'updated':
            return `${firstPart}${getValue(node.valueOld)}\n${currentIndent}${statuses.added}${key}: ${getValue(node.valueNew)}`;
          default:
            return `${firstPart}${getValue(node)}`;
        }
      });
    return `{\n${lines.join('\n')}\n${bracketIndent}}`;
  };
  return iter(obj, 1);
};
