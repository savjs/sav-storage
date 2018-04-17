/*
 * @Description     存储
 * @File       index.js
 * @Auth       jetiny@hfjy.com
 */

export * from './storage.js'

import localProvider from './localProvider.js'
import idbProvider from './idbProvider.js'
export {localProvider, idbProvider}

export * from './asyncStorage'
export * from './memoryProvider'
export * from './nativeProvider'
export * from './nodeProvider'
