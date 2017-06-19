
var {AsyncStorage, localProvider} = require('../dist/sav-storage.cjs')
var storage = new AsyncStorage()
storage.setProvider(localProvider)

/*
storage.set('city', {name:'sh', code:'021'}, 111)
storage.set('city', {name:'sz', code:'0755'}, 222)
storage.set('city', {name:'bj', code:'010'}, 333)*/

storage.set('city', {name:'sx', code:'0564'},555)
storage.set('city', {name:'hf', code:'0551'},444)


var citys = storage.get('city')

var citys2 = storage.get('city',444)

console.log(citys,citys2)

storage.remove('city',Date.now() - (6 * 86400000))

