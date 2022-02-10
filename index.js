// Task: Given JSON in this format (see input.json), give a list of all step names.

const assert = require('assert')

const example = require('./input.json')

function parse (item, toFind = 'steps', propName = 'name') {
  let found = []
  for (let key in item) {
    if (key === toFind) found.push(...item[key].flatMap(el => el[propName]))
    if (typeof item[key] === 'object')
      found.push(...parse(item[key], toFind, propName))
  }
  return [...found]
}

console.log(parse(example))
console.log(parse(example, 'steps', 'type'))
