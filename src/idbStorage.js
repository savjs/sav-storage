export class IDBStorage {
  constructor() {
    this.tr = null
  }

  openIDB(dbname) {
    return new Promise((resolve, reject) => {
      const DBOpenRequest = window.indexedDB.open(dbname, 1)
      DBOpenRequest.onupgradeneeded = (event) => {
        let db = event.target.result
        if (!db.objectStoreNames.contains(dbname)) {
          db.createObjectStore(dbname)
        }
      }

      DBOpenRequest.onerror = (event) => {
        console.error(event.currentTarget.error.message)
        reject(event.currentTarget.error.message)
      }

      DBOpenRequest.onsuccess = () => {
        let db = DBOpenRequest.result
        this.tr = (fn) => {
          return new Promise((resolve, reject) => {
            let store = db.transaction([dbname], 'readwrite').objectStore(dbname)
            let ret = fn(store)
            ret.onsuccess = function () {
              console.debug('success')
              resolve(this.result)
            }
            ret.onerror = function (evt) {
              reject(evt)
            }
          })
        }
        resolve(this)
      }
    })
  }

  set(key, value) {
    return this.tr((os) => os.put(value, key)).then(ret => {
      if (ret) {
        return ret
      }
    })
  }

  get(key) {
    return this.tr((os) => os.get(key)).then(ret => {
      if (ret) {
        return ret
      }
    })
  }

  remove(key) {
    return this.tr((os) => os.delete(key)).then(ret => {
      if (ret) {
        return ret
      }
    })
  }

  keys() {
    return this.tr((os) => os.getAllKeys())
  }

  has(key) {
    return this.keys().then(keys => {
      let i = 0
      let len = keys.length
      for (i; i < len; i++) {
        if (key === keys[i]) {
          return true
        }
      }
      return false
      // for(let k of keys) {
      //   if(k === key) {
      //     return true
      //   }
      // }
      // return false
    })
  }

}