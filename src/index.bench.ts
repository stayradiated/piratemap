import { bench } from 'vitest'
import { createPirateMap, pirateMapArray, pirateMapObject } from './index.js'

type ObjectKey = { a: number; b: number }
type ArrayKey = [number, number]

const mapObject = new Map<ObjectKey, number>([
  [{ a: 1, b: 2 }, 12],
  [{ a: 3, b: 4 }, 34],
  [{ a: 5, b: 6 }, 56],
])
const mapObjectString = new Map<string, number>([
  ['{"a":1,"b":2}', 12],
  ['{"a":3,"b":4}', 34],
  ['{"a":5,"b":6}', 56],
])

const mapArray = new Map<ArrayKey, number>([
  [[1, 2], 12],
  [[3, 4], 34],
  [[5, 6], 56],
])
const mapArrayString = new Map<string, number>([
  ['1,2', 12],
  ['3,4', 34],
  ['5,6', 56],
])

const customPirateMapObject = createPirateMap<ObjectKey>((a, b) => {
  return a.a === b.a && a.b === b.b
})

const customPirateMapArray = createPirateMap<ArrayKey>((a, b) => {
  return a[0] === b[0] && a[1] === b[1]
})

bench('pirateMapObject', () => {
  pirateMapObject.get(mapObject, { a: 1, b: 2 })
  pirateMapObject.get(mapObject, { a: 3, b: 4 })
  pirateMapObject.get(mapObject, { a: 5, b: 6 })
})

bench('customPirateMapObject', () => {
  customPirateMapObject.get(mapObject, { a: 1, b: 2 })
  customPirateMapObject.get(mapObject, { a: 3, b: 4 })
  customPirateMapObject.get(mapObject, { a: 5, b: 6 })
})

bench('Map + JSON.stringify', () => {
  mapObjectString.get(JSON.stringify({ a: 1, b: 2 }))
  mapObjectString.get(JSON.stringify({ a: 3, b: 4 }))
  mapObjectString.get(JSON.stringify({ a: 5, b: 6 }))
})

bench('customPirateMapArray', () => {
  customPirateMapArray.get(mapArray, [1, 2])
  customPirateMapArray.get(mapArray, [3, 4])
  customPirateMapArray.get(mapArray, [5, 6])
})

bench('pirateMapArray', () => {
  pirateMapArray.get(mapArray, [1, 2])
  pirateMapArray.get(mapArray, [3, 4])
  pirateMapArray.get(mapArray, [5, 6])
})

bench('Map + Array.join', () => {
  mapArrayString.get([1, 2].join(','))
  mapArrayString.get([3, 4].join(','))
  mapArrayString.get([5, 6].join(','))
})
