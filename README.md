# Pirate Map

> An ES6 map that supports complex keys with shallow equals

## Installation

```
$ yarn add piratemap
```

## Why would I use this?

Because you want to use an object or array as a key in a Map.

But unless you keep a reference to the original key, you will not be able to
retrieve a value.

```javascript
const map = new Map()

map.set({x: 20, y: 20}, 'here be treasure')

map.get({x: 20, y: 30}) // undefined !!!
```

But with PirateMap, you can do this!

```javascript
const map = new PirateMap()

map.set({x: 20, y: 20}, 'here be treasure')

map.get({x: 20, y: 30}) // 'here be treasure' !!!
```

## How do I use it?

It has exactly the same API as the [builtin Map class.](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Map)
