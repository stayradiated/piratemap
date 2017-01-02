import equals from 'is-equal-shallow'

// I would love to just use `extends Map`
// but that's not supported with Babel and ES5.

export default class PirateMap {
  constructor (value) {
    this._ = new Map(value)
  }

  get size () {
    return this._.size
  }

  clear () {
    return this._.clear()
  }

  delete (key) {
    for (const [_key] of this._) {
      if (equals(key, _key)) {
        return this._.delete(_key)
      }
    }
    return false
  }

  entries () {
    return this._.entries()
  }

  forEach (callbackFn, thisArg) {
    for (const [key, value] of this._) {
      callbackFn.call(thisArg, value, key, this)
    }
    return undefined
  }

  get (key) {
    for (const [_key, value] of this._) {
      if (equals(key, _key)) {
        return value
      }
    }
    return undefined
  }

  has (key) {
    for (const [_key] of this._) {
      if (equals(key, _key)) {
        return true
      }
    }
    return false
  }

  keys () {
    return this._.keys()
  }

  set (key, value) {
    for (const [_key] of this._) {
      if (equals(key, _key)) {
        return this._.set(_key, value)
      }
    }
    return this._.set(key, value)
  }

  values () {
    return this._.values()
  }

  [Symbol.iterator] () {
    return this._[Symbol.iterator]()
  }
}
