import { isFunction, toPromise } from 'sav-util'

export class AsyncStorage {
  constructor () {
    this._module = ''
    this._prefix = ''
    this._provider = null
  }
  // provider
  setProvider (value) {
    this._provider = value
  }
  get provider () {
    return this._provider
  }
  // prefix
  setPrefix (value) {
    this._prefix = value
  }
  get prefix () {
    return this._prefix
  }
  // private util
  path (key) {
    return this._prefix + this._module + (key || '')
  }
  // public api
  get (key, id) {
    let obj = this._provider.get(this.path(key))
    if(arguments.length ===2) {
      return obj[id] ? obj[id].value : null
    } else {
      return obj
    }
  }
  set (key, value, id) {
    if (arguments.length === 3) {
      let obj = this.get(key) || {}
      if (!obj) obj = {}
      obj[id] = {
        value: value,
        expires: +Date.now()
      }
      this.set(key, obj)
    } else {
      return this._provider.set(this.path(key), value)
    }
  }
  has (key) {
    return this._provider.has(this.path(key))
  }
  remove (key, expires) {
    if (arguments.length === 2) {
      let obj = this.get(key) || {}
      if (!obj || !Object.keys(obj).length) return
      Object.keys(obj).forEach((kye) => {
        if (obj[kye].expires < expires) {
          delete obj[kye]
        }
      })
      !Object.keys(obj).length ? this.remove(key) : this.set(key, obj)
    } else {
      return this._provider.remove(this.path(key))
    }
  }
  clear (path, skips) {
    return this._provider.clear(this.path(path), skips)
  }
  // create new child module
  module (name) {
    const ret = new AsyncStorage()
    ret._provider = this
    if (isFunction(name)) {
      Object.defineProperty(ret, '_module', { get: name })
    } else {
      ret._module = name
    }
    return ret
  }
}

// api converter
export function toAsyncProvider (storage) {
  return toPromise(storage, [ 'get', 'set', 'has', 'remove', 'clear' ])
}
