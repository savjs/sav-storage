var savStorage=require('../dist/dist/sav-storage.cjs')
var Storage=savStorage.Storage
var localProvider=savStorage.localProvider

var storage=new Storage();
storage.provider(localProvider);
storage.set("tel",13012345678)

console.log(storage.has("tel"))
console.log(storage.get("tel"))
console.log(storage.get("name"))
console.dir(storage)