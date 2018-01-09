var {AsyncStorage, localProvider, toAsyncProvider} = require('../dist/sav-storage.cjs')
var storage = new AsyncStorage()
storage.setProvider(toAsyncProvider(localProvider))
//storage.set('city', {name:'sh', code:'021'}, 111)
//storage.set('city', {name:'sz', code:'0755'}, 222)
//storage.set('city', {name:'bj', code:'010'}, 333)

//storage.set('city', {name:'sx', code:'0564'},555)
//storage.set('city', {name:'hf', code:'0551'},444)
//storage.set('city2',"hello")

storage.get('city').then((o) => {
  console.log('city',o)
})


console.log(storage.get('ctiy2'))

storage.remove('city',Date.now() - (1 * 86400000))