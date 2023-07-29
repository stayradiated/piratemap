import { shallowEqualObjects, shallowEqualArrays } from 'shallow-equal'

type MapLike<K, V> = {
  delete(key: K): boolean
  set(key: K, value: V): MapLike<K, V>
  keys(): IterableIterator<K>
  entries(): IterableIterator<[K, V]>
}

const createPirateMap = <Key>(isEqual: (a: Key, b: Key) => boolean) => ({
  delete<K extends Key, V>(map: MapLike<K, V>, key: K): boolean {
    for (const _key of map.keys()) {
      if (isEqual(key, _key)) {
        return map.delete(_key)
      }
    }

    return false
  },
  get<K extends Key, V>(map: MapLike<K, V>, key: K): V | undefined {
    for (const [_key, value] of map.entries()) {
      if (isEqual(key, _key)) {
        return value
      }
    }

    return undefined
  },
  has<K extends Key, V>(map: MapLike<K, V>, key: K): boolean {
    for (const _key of map.keys()) {
      if (isEqual(key, _key)) {
        return true
      }
    }

    return false
  },
  set<K extends Key, V>(map: MapLike<K, V>, key: K, value: V): MapLike<K, V> {
    for (const _key of map.keys()) {
      if (isEqual(key, _key)) {
        return map.set(_key, value)
      }
    }

    return map.set(key, value)
  },
})

const pirateMapObject =
  createPirateMap<Record<string, any>>(shallowEqualObjects)
const pirateMapArray = createPirateMap<any[]>(shallowEqualArrays)

export { createPirateMap, pirateMapObject, pirateMapArray }
