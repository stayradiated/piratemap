import { bench } from 'vitest'
import PirateMap from './index.js'

const pmapObject = new PirateMap([
  [{ a: 1, b: 2 }, 12],
  [{ c: 3, d: 4 }, 34],
  [{ e: 5, f: 6 }, 56],
])

const pmapArray = new PirateMap([
  [[1, 2], 12],
  [[3, 4], 34],
  [[5, 6], 56],
])

const map = new Map([
  ['1,2', 12],
  ['3,4', 34],
  ['5,6', 56],
])

bench('PirateMap (object)', () => {
  pmapObject.get({ a: 1, b: 2 })
  pmapObject.get({ c: 3, d: 4 })
  pmapObject.get({ e: 5, f: 6 })
})

bench('PirateMap (array)', () => {
  pmapArray.get([1, 2])
  pmapArray.get([3, 4])
  pmapArray.get([5, 6])
})

bench('Map with hardcoded string', () => {
  map.get('1,2')
  map.get('3,4')
  map.get('5,6')
})

bench('Map with hardcoded string', () => {
  map.get('1,2')
  map.get('3,4')
  map.get('5,6')
})

bench('Map + Object.values().join()', () => {
  map.get(Object.values({ a: 1, b: 2 }).join(','))
  map.get(Object.values({ c: 3, d: 4 }).join(','))
  map.get(Object.values({ e: 5, f: 6 }).join(','))
})

const mapJSON = new Map([
  ['{"a":1,"b":2}', 12],
  ['{"c":3,"d":4}', 34],
  ['{"e":5,"f":6}', 56],
])

bench('Map + JSON.stringify', () => {
  map.get(JSON.stringify({ a: 1, b: 2 }))
  map.get(JSON.stringify({ c: 3, d: 4 }))
  map.get(JSON.stringify({ e: 5, f: 6 }))
})
