export class MemoryProvider {
  constructor (store) {
    this.store = store || {}
  }
  get (key) {
    if (key in this.store) {
      let data = this.store[key]
      switch (data) {
        case 'null':
          return null
        case 'undefined':
        case undefined:
          return undefined
        default:
          return JSON.parse(data)
      }
    }
  }
  set (key, value) {
    this.store[key] = JSON.stringify(value)
  }
  has (key) {
    return key in this.store
  }
  remove (key) {
    delete this.store[key]
  }
  clear (path, skips) {
    let store = this.store
    let pathLen = path.length
    if (skips && skips.length) {
      for (let key in store) {
        if (key.indexOf(path) === 0) {
          if (skips.indexOf(key.substr(pathLen, key.length)) === -1) {
            delete store[key]
          }
        }
      }
    } else {
      for (let key in store) {
        if (key.indexOf(path) === 0) {
          delete store[key]
        }
      }
    }
  }
}
