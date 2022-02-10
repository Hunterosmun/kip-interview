// Task: Given JSON in this format (see input.json), give a list of all step names.

const assert = require('assert')

const example = require('./input.json')

function parse (item, toFind = 'steps', propName = 'name') {
  let found = []
  if (Array.isArray(item)) item.flatMap(k => [...parse(k, toFind, propName)])
  if (typeof item === 'object') {
    for (let key in item) {
      if (key === toFind) found.push(...gatherElements(item[key], propName))
      if (typeof item[key] === 'object' || Array.isArray(item[key])) {
        found.push(...parse(item[key], toFind, propName))
      }
    }
  }
  return [...found]
}

function gatherElements (arr, propName) {
  return arr.flatMap(el => el[propName])
}

console.log(parse(example, 'steps', 'name'))
console.log(parse(example, 'steps', 'type'))
