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
import { pirateMapObject } from 'piratemap'

const map = new Map()

pirateMapObject.set(map, {x: 4, y: 7}, 'here be treasure')

pirateMapObject.get(map, {x: 4, y: 7}) // 'here be treasure' :)
```

## How do I use it?

Choose either `pirateMapObject` or `pirateMapArray`, depending on the data type
of your map key.

### API

The API mimics methods on the [built-in Map
class.](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Map)
#### `get`

```typescript
const map = new Map([
    [[1, 2, 3], 'value']
])

pirateMapArray.get(map, [1, 2, 3]) // value
pirateMapArray.get(map, [4, 5, 6]) // undefined
```

#### `has`

```typescript
const map = new Map([
    [[1, 2, 3], 'value']
])

pirateMapArray.has(map, [1, 2, 3]) // true
pirateMapArray.has(map, [4, 5, 6]) // false
```

#### `set`

```typescript
const map = new Map([
    [[0, 1], '0-1']
    [[1, 2], '1-2']
])

pirateMapArray.set(map, [1, 2], 'new value')

[...map.entries()] // [ [[0, 1], '0-1'], [[1, 2], 'new value'] ]
```

#### `delete`

```typescript
const map = new Map([
    [[0, 1], '0-1']
    [[1, 2], '1-2']
])

pirateMapArray.delete(map, [1, 2])

[...map.entries()] // [ [[0, 1], '0-1'] ]
```

### Custom Equality Function

There is also a `createPirateMap` function you can use to supply your own
equality function.

```typescript
import { createPirateMap } from 'piratemap'

type Key = {
    id: number
    rangeStart: number
    rangeEnd: number
}

const pirateMap = createPirateMap<Key>((a, b) => {
    return (
        a.id === b.id &&
        a.rangeStart === b.rangeStart &&
        a.rangeEnd === b.rangeEnd
    )
})

const map = new Map<Key, Value[]>()

pirateMap.set(map, { id, rangeStart, rangeEnd }, values[])
pirateMap.get(map, { id, rangeStart, rangeEnd })
```

## License

PirateMap is licensed under the [MIT License](./LICENSE.md).
