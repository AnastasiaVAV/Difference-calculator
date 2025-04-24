import _ from 'lodash'

const replacer = ' '
const spacesCount = 4
const leftShift = 2

const formatValue = (value, depth) => {
  if (!_.isObject(value)) {
    return `${value}`
  }
  const indentSize = (depth * spacesCount) - leftShift
  const currentIndent = replacer.repeat(indentSize)
  const bracketIndent = indentSize > spacesCount ? replacer.repeat((indentSize - spacesCount) + leftShift) : ''
  const lines = Object
    .entries(value)
    .map(([key, val]) => `${currentIndent}  ${key}: ${formatValue(val, depth + 1)}`)
  return `{\n${lines.join('\n')}\n${bracketIndent}}`
}

export default (tree) => {
  const iter = (currentNode, depth) => {
    const indentSize = (depth * spacesCount) - leftShift
    const currentIndent = replacer.repeat(indentSize)
    const bracketIndent = indentSize > spacesCount ? replacer.repeat((indentSize - spacesCount) + leftShift) : ''

    const lines = currentNode.map((node) => {
      switch (node.type) {
        case 'added':
          return `${currentIndent}+ ${node.name}: ${formatValue(node.value, depth + 1)}`
        case 'removed':
          return `${currentIndent}- ${node.name}: ${formatValue(node.value, depth + 1)}`
        case 'updated':
          return `${currentIndent}- ${node.name}: ${formatValue(node.oldValue, depth + 1)}\n${currentIndent}+ ${node.name}: ${formatValue(node.newValue, depth + 1)}`
        case 'nested':
          return `${currentIndent}  ${node.name}: ${iter(node.children, depth + 1)}`
        case 'unchanged':
          return `${currentIndent}  ${node.name}: ${formatValue(node.value, depth + 1)}`
        default:
          return ''
      }
    })
    return `{\n${lines.join('\n')}\n${bracketIndent}}`
  }
  return iter(tree, 1)
}
