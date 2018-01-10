var {IDBStorage} = require('../dist/sav-storage.cjs')
let lessons=[]
for(let i=100;i<111;i++) {
  lessons.push({lessionId:i, name:'name' +i})
}
async function init() {
  let storage = await new IDBStorage().openIDB('hfjy-idb')
  storage.set('city','shanghai')
  storage.set('lesson',lessons)
  storage.set(11,111111111111111)

  setTimeout(() => {
    storage.remove(11)
  }, 5000)

  storage.get('lesson').then((res) => {
    console.log(res)
  })

  storage.keys().then(res =>  console.log(res))

  storage.has('city').then(res => {
    console.log(res)
  })
}

init()

