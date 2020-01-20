# Pirate Map

> An extension of the builtin Map class, but the keys are compared by value instead of reference.

## Installation

```shell
npm install piratemap
```

## Why would I use this?

Because you want to use an object or array as a key in a Map. Unless you keep a
reference to the original key, you will not be able to easily retrieve the
value. You might also end up with accidental duplicates.

## Why would I _not_ use this?

It's pretty slow... If you care about high performance, find a way to serialize
your keys as strings.

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

With PirateMap, this is fixed:

```javascript
const map = new PirateMap()

map.set({x: 20, y: 30}, 'here be treasure')

map.get({x: 20, y: 30}) // 'here be treasure'
```

## How do I use it?

It has exactly the same API as the [builtin Map
class.](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Map)
