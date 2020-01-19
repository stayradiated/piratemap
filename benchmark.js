const Benchmark = require('benchmark')
const assert = require('assert')

const PirateMap = require('./dist').default

const pmap = new PirateMap([
  [{a: 1, b: 2}, 12],
  [{c: 3, d: 4}, 34],
  [{e: 5, f: 6}, 56],
])

const map = new Map([
  ['1,2', 12],
  ['3,4', 34],
  ['5,6', 56],
])

const suite = new Benchmark.Suite('PirateMap vs Map', {
  onError: (error) => {
    console.error(error)
  },
  onCycle: (event) => {
    console.log(String(event.target))
  },
  onComplete: function onComplete () {
    console.log('Fastest is ' + this.filter('fastest').map('name'))
  },
})

suite
  .add('PirateMap', () => {
    assert(pmap.get({a: 1, b: 2}) == 12)
    assert(pmap.get({c: 3, d: 4}) == 34)
    assert(pmap.get({e: 5, f: 6}) == 56)
  })
  .add('Map with hardcoded string', () => {
    assert(map.get('1,2') == 12)
    assert(map.get('3,4') == 34)
    assert(map.get('5,6') == 56)
  })
  .add('Map with join', () => {
    assert(map.get(Object.values({a: 1, b: 2}).join()) == 12)
    assert(map.get(Object.values({c: 3, d: 4}).join()) == 34)
    assert(map.get(Object.values({e: 5, f: 6}).join()) == 56)
  })
  .run({async: true})

