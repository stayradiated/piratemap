import { describe, test, expect } from 'vitest'
import { pirateMapArray as pmArray } from './index.js'

describe('pirateMapArray', () => {
  test('delete', () => {
    const map = new Map([[[1, 2, 3], 'value']])
    expect(map.size).toBe(1)

    const result = pmArray.delete(map, [1, 2, 3])
    expect(result).toBe(true)
    expect(map.size).toBe(0)
  })

  test('has', () => {
    const map = new Map([
      [[], 'empty array'],
      [[1, 2, 3], 'non-empty array'],
    ])

    expect(pmArray.has(map, [])).toBe(true)
    expect(pmArray.has(map, [1, 2, 3])).toBe(true)

    expect(pmArray.has(map, [1, 2])).toBe(false)
    expect(pmArray.has(map, [1, 2, 3, 4])).toBe(false)
  })

  test('get', () => {
    const map = new Map([
      [[], 'empty array'],
      [[1, 2, 3], 'non-empty array'],
    ])

    expect(pmArray.get(map, [])).toBe('empty array')
    expect(pmArray.get(map, [1, 2, 3])).toBe('non-empty array')

    expect(pmArray.get(map, [1, 2])).toBe(undefined)
    expect(pmArray.get(map, [1, 2, 3, 4])).toBe(undefined)
  })

  test('set', () => {
    const map = new Map()

    pmArray.set(map, [1], 1)
    pmArray.set(map, [2], 2)
    pmArray.set(map, [3], 3)

    expect([...map.entries()]).toStrictEqual([
      [[1], 1],
      [[2], 2],
      [[3], 3],
    ])

    pmArray.set(map, [1], 'a')
    pmArray.set(map, [2], 'b')
    pmArray.set(map, [3], 'c')

    expect([...map.entries()]).toStrictEqual([
      [[1], 'a'],
      [[2], 'b'],
      [[3], 'c'],
    ])
  })
})
