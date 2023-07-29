type SetLike<K> = {
  delete(key: K): boolean
  add(key: K): SetLike<K>
  keys(): IterableIterator<K>
}

const createPirateSet = <Key>(isEqual: (a: Key, b: Key) => boolean) => ({
  delete<K extends Key>(set: SetLike<K>, key: K): boolean {
    for (const _key of set.keys()) {
      if (isEqual(key, _key)) {
        return set.delete(_key)
      }
    }

    return false
  },
  has<K extends Key>(set: SetLike<K>, key: K): boolean {
    for (const _key of set.keys()) {
      if (isEqual(key, _key)) {
        return true
      }
    }

    return false
  },
  add<K extends Key>(set: SetLike<K>, key: K): SetLike<K> {
    for (const _key of set.keys()) {
      if (isEqual(key, _key)) {
        // If the key is already in the set, return the set unchanged.
        return set
      }
    }

    return set.add(key)
  },
})

export { createPirateSet }
