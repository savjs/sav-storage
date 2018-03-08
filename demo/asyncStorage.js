var {AsyncStorage, localProvider, toAsyncProvider, idbProvider} = require('../dist/sav-storage.cjs')
var storage = new AsyncStorage()
idbProvider.setIDB({name:'hfjy-idb', version:10})
storage.setProvider(toAsyncProvider(idbProvider))
storage.set('city', {name:'sh', code:'021'}, 111)
storage.set('city', {name:'sz', code:'0755'}, 222)
storage.set('city', {name:'bj', code:'010'}, 333)

storage.set('city', {name:'sx', code:'0564'},555)
storage.set('city', {name:'hf', code:'0551'},444)
storage.set('city2',"hello")

storage.get('city').then((o) => {
  console.log('city',o)
})


console.log(storage.get('ctiy2'))

storage.remove('city',Date.now() - (1 * 86400000))

userStorage = storage.module(() => {
  return 110 + '.'
})

userStorage.set('userInfo',  {name:'hf', code:'0551'})