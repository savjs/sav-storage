// import buble from 'rollup-plugin-buble'
import async from 'rollup-plugin-async'

const pack = require('./package.json')
const YEAR = new Date().getFullYear()
const output = {
  banner: `/*!
       * ${pack.name} v${pack.version}
       * (c) ${YEAR} ${pack.author.name} ${pack.author.email}
       * Release under the ${pack.license} License.
       */`
}
export default {
  input: 'src/index.js',
  output: [
    {
      file: 'dist/sav-storage.cjs.js',
      format: 'cjs',
      banner: output.banner
    },
    {
      file: 'dist/sav-storage.es.js',
      format: 'es',
      banner: output.banner
    }
  ],
  plugins: [
    async()
    // buble()
  ],
  // Cleaner console
  onwarn ({loc, frame, message}) {
    // print location if applicable
    if (loc) {
      console.warn(`${loc.file} (${loc.line}:${loc.column}) ${message}`)
      if (frame) console.warn(frame)
    } else {
      console.warn(message)
    }
  }
}
