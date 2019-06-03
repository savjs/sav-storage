
import {prop, isFunction} from 'sav-util'

export function Storage () {
  prop(this, '_p', {
    provider: null,
    prefix: '',
    module: '',
    self: this
  })
}

Storage.prototype.use = function (fn, opts) {
  fn(this._p, opts)
  return this
}

Storage.prototype.setProvider = Storage.prototype.provider = function (provider) {
  this._p.provider = provider
  return this
}

Storage.prototype.get = function (key) {
  try {
    return this._p.provider.get(this._prefix(key))
  } catch (err) {
    console.error('storage-get', err)
  }
}

Storage.prototype.has = function (key) {
  return this._p.provider.has(this._prefix(key))
}

Storage.prototype.remove = function (key) {
  this._p.provider.remove(this._prefix(key))
}

Storage.prototype.set = function (key, value) {
  return this._p.provider.set(this._prefix(key), value)
}

Storage.prototype._prefix = function (key) {
  return this._p.prefix + this._p.module + (key || '')
}

Storage.prototype.clear = function (key, skips) {
  return this._p.provider.clear(this._prefix(key), skips)
}

Storage.prototype.module = function (name) {
  var ret = new Storage()
  ret._p.provider = this
  if (isFunction(name)) {
    Object.defineProperty(ret._p, 'module', {
      get: name
    })
  } else {
    ret._p.module = name
  }
  return ret
}
