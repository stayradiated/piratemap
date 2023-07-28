import { shallowEqual } from 'shallow-equal'

// eslint-disable-next-line @typescript-eslint/ban-types
type Comparable = Record<string, any> | any[] | undefined | null

export default class PirateMap<K extends Comparable, V> extends Map<K, V> {
  override delete(key: K) {
    for (const _key of super.keys()) {
      if (shallowEqual(key, _key)) {
        return super.delete(_key)
      }
    }

    return false
  }

  override get(key: K) {
    for (const [_key, value] of super.entries()) {
      if (shallowEqual(key, _key)) {
        return value
      }
    }

    return undefined
  }

  override has(key: K) {
    for (const _key of super.keys()) {
      if (shallowEqual(key, _key)) {
        return true
      }
    }

    return false
  }

  override set(key: K, value: V) {
    for (const _key of super.keys()) {
      if (shallowEqual(key, _key)) {
        return super.set(_key, value)
      }
    }

    return super.set(key, value)
  }
}
