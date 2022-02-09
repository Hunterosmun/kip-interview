// Task: Given JSON in this format (see input.json), give a list of all step names.

const assert = require('assert')

const example = require('./input.json')

function parse (item, toFind = 'steps', propertyName) {
  const names = []
  if (Array.isArray(item)) {
    names.push(
      ...item.flatMap(key => {
        return parse(item[key], toFind, propertyName)
      })
    )
  }
  if (typeof item === 'object') {
    names.push(
      ...Object.keys(item).flatMap(key => {
        if (key === toFind)
          names.push(...gatherElements(item[key], propertyName))
        if (typeof item[key] === 'object' || Array.isArray(item[key])) {
          return parse(item[key], toFind, propertyName)
        }
      })
    )
  }
  return [...names].filter(Boolean)
}

function gatherElements (arr, propertyName) {
  return arr.flatMap(el => {
    return el[propertyName]
  })
}

console.log(parse(example, 'steps', 'type'))
