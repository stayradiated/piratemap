import { test, expect } from 'vitest'
import PirateMap from './index.js'

test('constructor', () => {
  const m = new PirateMap([
    [['a'], 1],
    [['b'], 2],
    [['c'], 3],
  ])
  expect(m.size).toBe(3)
})

test('clone via constructor', () => {
  const a = new PirateMap()
  a.set([1, 2, 3], 123)

  const b = new PirateMap(a)
  expect(b.get([1, 2, 3])).toBe(123)
  b.set([1, 2, 3], 456)
  expect(a.get([1, 2, 3])).toBe(123)
  expect(b.get([1, 2, 3])).toBe(456)
})

test('clear', () => {
  const m = new PirateMap()
  expect(m.size).toBe(0)
  m.set(['key'], 'value')
  expect(m.size).toBe(1)
  m.clear()
  expect(m.size).toBe(0)
})

test('delete', () => {
  const m = new PirateMap()
  m.set([1, 2, 3], 'value')
  expect(m.size).toBe(1)
  m.delete([1, 2, 3])
  expect(m.size).toBe(0)
})

test('entries', () => {
  const m = new PirateMap()
  m.set([1, 2, 3], 'value')
  const iter = m.entries()
  expect(iter.next()).toStrictEqual({
    value: [[1, 2, 3], 'value'],
    done: false,
  })
  expect(iter.next()).toStrictEqual({
    value: undefined,
    done: true,
  })
})

test('forEach', () => {
  const m = new PirateMap()
  m.set([1], 1)
  m.set([2], 2)
  m.set([3], 3)
  expect.assertions(9)
  const self = Symbol('self')
  // eslint-disable-next-line unicorn/no-array-for-each
  m.forEach(function (this: PirateMap<[number], number>, value, key, map) {
    expect(map).toBe(m)
    expect(this).toBe(self)
    switch (value) {
      case 1: {
        expect(key).toEqual([1])
        break
      }

      case 2: {
        expect(key).toEqual([2])
        break
      }

      case 3: {
        expect(key).toEqual([3])
        break
      }

      default: {
        throw new Error(`Could handle value: ${String(value)}`)
      }
    }
    // eslint-disable-next-line unicorn/no-array-method-this-argument
  }, self)
})

test('get', () => {
  const m = new PirateMap()
  // Undefined
  m.set(undefined, true)
  expect(m.get(undefined)).toBe(true)
  // Null
  m.set(null, true)
  expect(m.get(null)).toBe(true)
  // Number
  m.set([0], true)
  expect(m.get([0])).toBe(true)
  // String
  m.set([''], true)
  expect(m.get([''])).toBe(true)
  // Boolean
  m.set([false], true)
  expect(m.get([false])).toBe(true)
  // Empty array
  m.set([], true)
  expect(m.get([])).toBe(true)
  // Non-empty array
  m.set([1, 2, 3], true)
  expect(m.get([1, 2, 3])).toBe(true)
  // Empty object
  m.set({}, true)
  expect(m.get({})).toBe(true)
  // Non-empty object
  m.set({ a: 1, b: 2 }, true)
  expect(m.get({ a: 1, b: 2 })).toBe(true)
})

test('has', () => {
  const m = new PirateMap()
  // Undefined
  m.set(undefined, true)
  expect(m.has(undefined)).toBe(true)
  // Null
  m.set(null, true)
  expect(m.has(null)).toBe(true)
  // Number
  m.set([0], true)
  expect(m.has([0])).toBe(true)
  // String
  m.set([''], true)
  expect(m.has([''])).toBe(true)
  // Boolean
  m.set([false], true)
  expect(m.has([false])).toBe(true)
  // Empty array
  m.set([], true)
  expect(m.has([])).toBe(true)
  // Non-empty array
  m.set([1, 2, 3], true)
  expect(m.has([1, 2, 3])).toBe(true)
  // Empty object
  m.set({}, true)
  expect(m.has({})).toBe(true)
  // Non-empty object
  m.set({ a: 1, b: 2 }, true)
  expect(m.has({ a: 1, b: 2 })).toBe(true)
})

test('keys', () => {
  const m = new PirateMap()
  m.set([1], 1)
  m.set([2], 2)
  m.set([3], 3)
  const iter = m.keys()
  expect(iter.next()).toEqual({ value: [1], done: false })
  expect(iter.next()).toEqual({ value: [2], done: false })
  expect(iter.next()).toEqual({ value: [3], done: false })
  expect(iter.next()).toEqual({ value: undefined, done: true })
})

test('set', () => {
  const m = new PirateMap()
  m.set([1], 1)
  m.set([2], 2)
  m.set([3], 3)
  expect(m.get([1])).toBe(1)
  expect(m.get([2])).toBe(2)
  expect(m.get([3])).toBe(3)
  m.set([1], 'a')
  m.set([2], 'b')
  m.set([3], 'c')
  expect(m.get([1])).toBe('a')
  expect(m.get([2])).toBe('b')
  expect(m.get([3])).toBe('c')
})

test('values', () => {
  const m = new PirateMap()
  m.set([1], 1)
  m.set([2], 2)
  m.set([3], 3)
  const iter = m.values()
  expect(iter.next()).toEqual({ value: 1, done: false })
  expect(iter.next()).toEqual({ value: 2, done: false })
  expect(iter.next()).toEqual({ value: 3, done: false })
  expect(iter.next()).toEqual({ value: undefined, done: true })
})

test('@@iterator', () => {
  const m = new PirateMap()
  m.set([1], 1)
  m.set([2], 2)
  m.set([3], 3)
  expect.assertions(3)
  for (const [key, value] of m) {
    switch (value) {
      case 1: {
        expect(key).toEqual([1])
        break
      }

      case 2: {
        expect(key).toEqual([2])
        break
      }

      case 3: {
        expect(key).toEqual([3])
        break
      }

      default: {
        throw new Error(`Could handle value: ${String(value)}`)
      }
    }
  }
})
