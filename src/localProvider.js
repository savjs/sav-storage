/* global localStorage */
export default {
  get: function (key) {
    if (localStorage.hasOwnProperty(key)) {
      let data = localStorage.getItem(key)
      switch (data) {
        case 'null':
          return null
        case 'undefined':
          return undefined
        default:
          return JSON.parse(data)
      }
    }
  },
  set: function (key, value) {
    localStorage.setItem(key, JSON.stringify(value))
  },
  has: function (key) {
    return localStorage.hasOwnProperty(key)
  },
  remove: function (key) {
    localStorage.removeItem(key)
  },
  clear: function (path, skips) {
    let store = localStorage
    let pathLen = path.length
    if (skips && skips.length) {
      for (let key in store) {
        if (key.indexOf(path) === 0) {
          if (skips.indexOf(key.substr(pathLen, key.length)) === -1) {
            store.removeItem(key)
          }
        }
      }
    } else {
      for (let key in store) {
        if (key.indexOf(path) === 0) {
          store.removeItem(key)
        }
      }
    }
  }
}
