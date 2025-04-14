import _ from 'lodash';

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
        let status = '  ';
        switch (node.type) {
          case 'unchanged':
            break;
          case 'added':
            status = '+ ';
            break;
          case 'removed':
            status = '- ';
            break;
          case 'changed':
            return `${currentIndent}- ${key}: ${iter(node.valueOld, depth + 1)}\n${currentIndent}+ ${key}: ${iter(node.valueNew, depth + 1)}`;
          default:
            return `${currentIndent}  ${key}: ${iter(node, depth + 1)}`;
        }
        return `${currentIndent}${status}${key}: ${iter(node.value, depth + 1)}`;
      });
    return `{\n${lines.join('\n')}\n${bracketIndent}}`;
  };
  return iter(obj, 1);
};
