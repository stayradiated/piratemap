import { bench } from 'vitest'
import { createPirateMap } from './pirate-map.js'

type ObjectKey = { a: number; b: number }
type ArrayKey = [number, number]

const customPirateMapObject = createPirateMap<ObjectKey>((a, b) => {
  return a.a === b.a && a.b === b.b
})

const customPirateMapArray = createPirateMap<ArrayKey>((a, b) => {
  return a[0] === b[0] && a[1] === b[1]
})

const mapSize = 10_000

const mapObject = new Map<ObjectKey, number>([])
for (let i = 0; i < mapSize; i += 2) {
  mapObject.set({ a: i, b: i }, i)
}

const mapObjectString = new Map<string, number>([])
const mapArray = new Map<ArrayKey, number>([])
const mapArrayString = new Map<string, number>([])

const randomObjectKey = (): ObjectKey => {
  const i = Math.floor(Math.random() * mapSize)
  return { a: i, b: i }
}

const randomArrayKey = (): ArrayKey => {
  const i = Math.floor(Math.random() * mapSize)
  return [i, i]
}

for (const [key, value] of mapObject.entries()) {
  mapObjectString.set(JSON.stringify(key), value)
  mapArray.set([key.a, key.b], value)
  mapArrayString.set([key.a, key.b].join(','), value)
}

bench('customPirateMapObject', () => {
  customPirateMapObject.get(mapObject, randomObjectKey())
})

bench('Map + JSON.stringify', () => {
  mapObjectString.get(JSON.stringify(randomObjectKey))
})

bench('customPirateMapArray', () => {
  customPirateMapArray.get(mapArray, randomArrayKey())
})

bench('Map + Array.join', () => {
  mapArrayString.get(randomArrayKey().join(','))
})
