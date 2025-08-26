import _ from 'lodash'
import path from 'path'
import fs from 'fs'
import parse from './parse.js'
import formatter from './formatters/index.js'

const buildTree = (obj1, obj2) => {
  const allKeys = _.union(Object.keys(obj1), Object.keys(obj2)).toSorted()

  const children = allKeys.map((key) => {
    const hasKey1 = Object.hasOwn(obj1, key)
    const hasKey2 = Object.hasOwn(obj2, key)
    if (!hasKey1 || !hasKey2) {
      return !hasKey1
        ? { name: key, type: 'added', value: obj2[key] }
        : { name: key, type: 'removed', value: obj1[key] }
    }
    if (_.isObject(obj1[key]) && _.isObject(obj2[key])) {
      return { name: key, type: 'nested', children: buildTree(obj1[key], obj2[key]) }
    }
    const isEquality = obj1[key] === obj2[key]
    return isEquality
      ? { name: key, type: 'unchanged', value: obj1[key] }
      : {
          name: key,
          type: 'updated',
          oldValue: obj1[key],
          newValue: obj2[key],
        }
  })
  return children
}

const getContent = filepath => fs.readFileSync(path.resolve(filepath), 'utf-8')
const getFormat = filepath => path.extname(filepath).slice(1)

const gendiff = (filepath1, filepath2, format) => {
  const content1 = getContent(filepath1)
  const content2 = getContent(filepath2)
  const format1 = getFormat(filepath1)
  const format2 = getFormat(filepath2)
  const obj1 = parse(content1, format1)
  const obj2 = parse(content2, format2)
  const tree = buildTree(obj1, obj2)
  return formatter(tree, format)
}

export default gendiff
