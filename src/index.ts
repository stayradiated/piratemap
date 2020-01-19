import equals from 'shallowequal'

export default class PirateMap<K, V> extends Map<K, V> {
  delete (key: K) {
    for (const _key of super.keys()) {
      if (equals(key, _key)) {
        return super.delete(_key)
      }
    }
    return false
  }

  get (key: K) {
    for (const [_key, value] of super.entries()) {
      if (equals(key, _key)) {
        return value
      }
    }
    return undefined
  }

  has (key: K) {
    for (const _key of super.keys()) {
      if (equals(key, _key)) {
        return true
      }
    }
    return false
  }

  set (key: K, value: V) {
    for (const _key of super.keys()) {
      if (equals(key, _key)) {
        return super.set(_key, value)
      }
    }
    return super.set(key, value)
  }
}
