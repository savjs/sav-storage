// provider for NativeProvider like AsyncStorage from React-Native

export function NodeProvider (opts) {
  let {fs, path} = opts
  let ret = {
    getItem (key) {
      return readFileAsync(fs, path.resolve(opts.root, key))
    },
    setItem (key, value) {
      return writeFileAsync(fs, path.resolve(opts.root, key), value)
    },
    removeItem (key) {
      return unlinkFileAsync(fs, path.resolve(opts.root, key))
    },
    getAllKeys () {
      return readdirAsync(fs, path.resolve(opts.root))
    },
    multiRemove (keys) {
      return Promise.all(keys.map((src) => unlinkFileAsync(fs, path.resolve(opts.root, src))))
    }
  }
  return ret
}

function readFileAsync (fs, src) {
  return new Promise((resolve, reject) => {
    fs.readFile(src, (err, buf) => {
      if (err && err.code !== 'ENOENT') {
        return reject(err)
      }
      return resolve(buf && buf.toString())
    })
  })
}

function writeFileAsync (fs, src, data) {
  return new Promise((resolve, reject) => {
    fs.writeFile(src, data, (err, buf) => {
      if (err) {
        return reject(err)
      }
      return resolve()
    })
  })
}

function unlinkFileAsync (fs, src) {
  return new Promise((resolve, reject) => {
    fs.unlink(src, (err) => {
      if (err && err.code !== 'ENOENT') {
        return reject(err)
      }
      return resolve()
    })
  })
}

function readdirAsync (fs, src) {
  return new Promise((resolve, reject) => {
    fs.readdir(src, (err, data) => {
      if (err) {
        return reject(err)
      }
      return resolve(data)
    })
  })
}
