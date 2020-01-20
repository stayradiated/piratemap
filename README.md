![PirateMap](./piratemap.png)

> An extension of the builtin Map class, but the keys are compared by value
> instead of reference.

## Installation

```shell
npm install piratemap
```

## Why would I use this?

If you want to use an object as a key in a Map - unless you keep a reference to
the original object, you will not be able to easily retrieve the value, or you
might also accidentally insert duplicate items.

With PirateMap, the `has`, `get`, `set` and `delete` methods all perform a
shallow compare to check if a key with the same value already exists in the
map.

## Why would I _not_ use this?

If you care about high performance, you may not want to use this library -
instead try and find a way to serialize your keys as strings. 

## Examples

With a regular map, you can use an object as a key -- but it may not work as
you would expect:

```javascript
const map = new Map()

const key = { x: 4, y: 7 }

map.set(key, 'here be treasure')
map.get(key) // 'here be tresure'

// however, if you try and access the map with a similar object...
map.get({ x: 4, y: 7 }) // undefined :(
```

With PirateMap, this is not an issue!

```javascript
import PirateMap from 'piratemap'

const map = new PirateMap()

map.set({x: 4, y: 7}, 'here be treasure')

map.get({x: 4, y: 7}) // 'here be treasure' :)
```

## How do I use it?

It has exactly the same API as the [builtin Map
class.](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Map)
