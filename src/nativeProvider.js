/*
 * @Description react-native provider
 * @File       nativeProvider.js
 * @example
 * import {AsyncStorage as nativeStorage } from 'react-native'
 * import {AsyncStorage, NativeProvider } from 'sav-storage'
 *
 * let storage = new AsyncStorage()
 * storage.setProvider(new NativeProvider(nativeStorage))
 */

export class NativeProvider {
  constructor (nativeStorage) {
    this.provider = nativeStorage
  }
  get (key) {
    return this.provider.getItem(key).then((data) => {
      let ret
      switch (data) {
        case 'null':
        case null:
          ret = null
          break
        case 'undefined':
        case undefined:
          ret = undefined
          break
        default:
          ret = JSON.parse(data)
          break
      }
      return Promise.resolve(ret)
    })
  }
  set (key, value) {
    return this.provider.setItem(key, JSON.stringify(value))
  }
  has (key) {
    return this.provider.getItem(key).then((data) => {
      let ret
      switch (data) {
        case 'null':
        case null:
        case 'undefined':
        case undefined:
          ret = false
          break
        default:
          ret = true
      }
      return Promise.resolve(ret)
    })
  }
  remove (key) {
    return this.provider.removeItem(key)
  }
  clear (path, skips) {
    return this.provider.getAllKeys().then((store) => {
      let pathLen = path.length
      let keys = []
      if (skips && skips.length) {
        store.forEach((key) => {
          if (key.indexOf(path) === 0) {
            if (skips.indexOf(key.substr(pathLen, key.length)) === -1) {
              keys.push(key)
            }
          }
        })
      } else {
        store.forEach((key) => {
          if (key.indexOf(path) === 0) {
            keys.push(key)
          }
        })
      }
      if (keys.length) {
        return this.provider.multiRemove(keys)
      } else {
        return Promise.resolve(keys)
      }
    })
  }
}
