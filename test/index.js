import test from 'ava'

import PirateMap from '../lib'

test('constructor', (t) => {
  const m = new PirateMap([
    ['a', 1],
    ['b', 2],
    ['c', 3],
  ])
  t.is(m.size, 3)
})

test('clone via constructor', (t) => {
  const a = new PirateMap()
  a.set([1, 2, 3], 123)

  const b = new PirateMap(a)
  t.is(b.get([1, 2, 3]), 123)
  b.set([1, 2, 3], 456)
  t.is(a.get([1, 2, 3]), 123)
  t.is(b.get([1, 2, 3]), 456)
})

test('clear', (t) => {
  const m = new PirateMap()
  t.is(m.size, 0)
  m.set('key', 'value')
  t.is(m.size, 1)
  m.clear()
  t.is(m.size, 0)
})

test('delete', (t) => {
  const m = new PirateMap()
  m.set([1, 2, 3], 'value')
  t.is(m.size, 1)
  m.delete([1, 2, 3])
  t.is(m.size, 0)
})

test('entries', (t) => {
  const m = new PirateMap()
  m.set([1, 2, 3], 'value')
  const iter = m.entries()
  t.deepEqual(iter.next(), {
    value: [[1, 2, 3], 'value'],
    done: false,
  })
  t.deepEqual(iter.next(), {
    value: undefined,
    done: true,
  })
})

test('forEach', (t) => {
  const m = new PirateMap()
  m.set([1], 1)
  m.set([2], 2)
  m.set([3], 3)
  t.plan(9)
  const self = Symbol('self')
  m.forEach(function callbackFn (value, key, map) {
    t.is(map, m)
    t.is(this, self)
    switch (value) {
      case 1:
        t.deepEqual(key, [1])
        break
      case 2:
        t.deepEqual(key, [2])
        break
      case 3:
        t.deepEqual(key, [3])
        break
      default:
        throw new Error(`Could handle value: ${value}`)
    }
  }, self)
})

test('get', (t) => {
  const m = new PirateMap()
  // undefined
  m.set(undefined, true)
  t.true(m.get(undefined))
  // null
  m.set(null, true)
  t.true(m.get(null))
  // number
  m.set(0, true)
  t.true(m.get(0))
  // string
  m.set('', true)
  t.true(m.get(''))
  // boolean
  m.set(false, true)
  t.true(m.get(false))
  // empty array
  m.set([], true)
  t.true(m.get([]))
  // non-empty array
  m.set([1, 2, 3], true)
  t.true(m.get([1, 2, 3]))
  // empty object
  m.set({}, true)
  t.true(m.get({}))
  // non-empty object
  m.set({a: 1, b: 2}, true)
  t.true(m.get({a: 1, b: 2}))
})

test('has', (t) => {
  const m = new PirateMap()
  // undefined
  m.set(undefined, true)
  t.true(m.has(undefined))
  // null
  m.set(null, true)
  t.true(m.has(null))
  // number
  m.set(0, true)
  t.true(m.has(0))
  // string
  m.set('', true)
  t.true(m.has(''))
  // boolean
  m.set(false, true)
  t.true(m.has(false))
  // empty array
  m.set([], true)
  t.true(m.has([]))
  // non-empty array
  m.set([1, 2, 3], true)
  t.true(m.has([1, 2, 3]))
  // empty object
  m.set({}, true)
  t.true(m.has({}))
  // non-empty object
  m.set({a: 1, b: 2}, true)
  t.true(m.has({a: 1, b: 2}))
})

test('keys', (t) => {
  const m = new PirateMap()
  m.set([1], 1)
  m.set([2], 2)
  m.set([3], 3)
  const iter = m.keys()
  t.deepEqual(iter.next(), {value: [1], done: false})
  t.deepEqual(iter.next(), {value: [2], done: false})
  t.deepEqual(iter.next(), {value: [3], done: false})
  t.deepEqual(iter.next(), {value: undefined, done: true})
})

test('set', (t) => {
  // kind have already done this a million times
})

test('values', (t) => {
  const m = new PirateMap()
  m.set([1], 1)
  m.set([2], 2)
  m.set([3], 3)
  const iter = m.values()
  t.deepEqual(iter.next(), {value: 1, done: false})
  t.deepEqual(iter.next(), {value: 2, done: false})
  t.deepEqual(iter.next(), {value: 3, done: false})
  t.deepEqual(iter.next(), {value: undefined, done: true})
})

test('@@iterator', (t) => {
  const m = new PirateMap()
  m.set([1], 1)
  m.set([2], 2)
  m.set([3], 3)
  t.plan(3)
  for (const [key, value] of m) {
    switch (value) {
      case 1:
        t.deepEqual(key, [1])
        break
      case 2:
        t.deepEqual(key, [2])
        break
      case 3:
        t.deepEqual(key, [3])
        break
      default:
        throw new Error(`Could handle value: ${value}`)
    }
  }
})

