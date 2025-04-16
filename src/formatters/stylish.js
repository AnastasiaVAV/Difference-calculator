import _ from 'lodash';

const statuses = {
  unchanged: '  ',
  added: '+ ',
  removed: '- ',
  updated: { removed: '- ', added: '+ ' },
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
        const getValue = (value) => iter(value, depth + 1);
        if (!node.type) {
          return `${currentIndent}${statuses.unchanged}${key}: ${getValue(node)}`;
        }
        const nodeStatus = _.isObject(statuses[node.type])
          ? statuses[node.type].removed
          : statuses[node.type];
        const currentValue = node.type === 'updated'
          ? getValue(node.valueOld)
          : getValue(node.value);
        const secondStr = node.type === 'updated'
          ? `\n${currentIndent}${statuses[node.type].added}${key}: ${getValue(node.valueNew)}`
          : '';
        return `${currentIndent}${nodeStatus}${key}: ${currentValue}${secondStr}`;
      });
    return `{\n${lines.join('\n')}\n${bracketIndent}}`;
  };
  return iter(obj, 1);
};
