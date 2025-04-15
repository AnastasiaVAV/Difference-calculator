import _ from 'lodash';

const status = {
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
        let value;
        let secondString = '';
        const nodeStatus = status[node.type] || status.unchanged;
        switch (node.type) {
          case 'unchanged':
            value = node.value;
            break;
          case 'added':
            value = node.value;
            break;
          case 'removed':
            value = node.value;
            break;
          case 'updated':
            value = node.valueOld;
            secondString = `\n${currentIndent}${status.added}${key}: ${iter(node.valueNew, depth + 1)}`;
            break;
          default:
            value = node;
            break;
        }
        return `${currentIndent}${nodeStatus}${key}: ${iter(value, depth + 1)}${secondString}`;
      });
    return `{\n${lines.join('\n')}\n${bracketIndent}}`;
  };
  return iter(obj, 1);
};
