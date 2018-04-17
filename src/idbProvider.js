export default {
  opts: {name: 'sav-storage', version: 1},
  setIDB (opts) {
    this.opts = Object.assign(this.opts, opts)
  },
  openIDB () {
    return new Promise((resolve, reject) => {
      const DBOpenRequest = window.indexedDB.open(this.opts.name, this.opts.version)
      DBOpenRequest.onupgradeneeded = (event) => {
        let db = event.target.result
        if (!db.objectStoreNames.contains(this.opts.name)) {
          db.createObjectStore(this.opts.name)
        }
      }

      DBOpenRequest.onerror = (event) => {
        console.error(event.currentTarget.error.message)
        reject(event.currentTarget.error.message)
      }

      DBOpenRequest.onsuccess = () => {
        let db = DBOpenRequest.result
        let tr = (fn) => {
          return new Promise((resolve, reject) => {
            let store = db.transaction([this.opts.name], 'readwrite').objectStore(this.opts.name)
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
        resolve(tr)
      }
    })
  },
  get tr () {
    if (!this._tr) {
      this._tr = this.openIDB()
    }
    return this._tr
  },

  set (key, value) {
    return this.tr((os) => os.put(value, key)).then(ret => {
      if (ret) {
        return ret
      }
    })
  },

  get (key) {
    return this.tr((os) => os.get(key)).then(ret => {
      if (ret) {
        return ret
      }
    })
  },

  getAll () {
    return this.tr((os) => os.getAll()).then(ret => {
      if (ret) {
        return ret
      }
    })
  },

  getAllKeys () {
    return this.tr((os) => os.getAllKeys()).then(ret => {
      if (ret) {
        return ret
      }
    })
  },

  remove (key) {
    return this.tr((os) => os.delete(key)).then(ret => {
      if (ret) {
        return ret
      }
    })
  },

  keys () {
    return this.tr((os) => os.getAllKeys())
  },

  async has (key) {
    let keys = await this.keys()
    for (let k of keys) {
      if (k === key) {
        return true
      }
    }
    return false
  }
}
