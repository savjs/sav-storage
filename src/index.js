/*
 * @Description     存储
 * @File       index.js
 * @Auth       jetiny@hfjy.com
 */

export * from './storage.js'

import localProvider from './localProvider.js'
export {localProvider}

export * from './asyncStorage'
export * from './memoryProvider'
export * from './nativeProvider'
export * from './nodeProvider'
