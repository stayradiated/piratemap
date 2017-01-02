const Benchmark = require('benchmark')

const PirateMap = require('./dist').default

const pmap = new PirateMap([
  [[10, 20], 1020],
  [[20, 30], 2030],
  [[30, 40], 3040],
])

const map = new Map([
  ['10,20', 1020],
  ['20,30', 2030],
  ['30,40', 3040],
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
    pmap.get([10, 20])
    pmap.get([20, 30])
    pmap.get([30, 40])
  })
  .add('Map with join', () => {
    map.get([10, 20].join(','))
    map.get([20, 30].join(','))
    map.get([30, 40].join(','))
  })
  .add('Map', () => {
    map.get('10,20')
    map.get('20,30')
    map.get('30,40')
  })
  .run({async: true})

