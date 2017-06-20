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

  isExpires (o, key, expires) {
    Object.keys(o).forEach((kye) => {
      if (o[kye].expires < expires) {
        delete o[kye]
      }
    })
    !Object.keys(o).length ? this.remove(key) : this.set(key, o)
  }

  // public api
  get (key, id) {
    let obj = this._provider.get(this.path(key))
    if (arguments.length === 2) {
      return obj.then((o) => {
        if (!o) {
          return null
        }
        return o[id] ? o[id].value : null
      })
    } else {
      return obj
    }
  }
  set (key, value, id) {
    if (arguments.length === 3) {
      this.get(key).then((o) => {
        if (!o) o = {}
        o[id] = {
          value: value,
          expires: +Date.now()
        }
        return this._provider.set(this.path(key), o)
      })
    } else {
      return this._provider.set(this.path(key), value)
    }
  }
  has (key) {
    return this._provider.has(this.path(key))
  }
  remove (key, expires) {
    if (arguments.length === 2) {
      this.get(key).then((o) => {
        if (!o) return null
        this.isExpires(o, key, expires)
      })
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
