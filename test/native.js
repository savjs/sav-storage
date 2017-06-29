import test from 'ava'
import fs from 'fs'
import path from 'path'

import {AsyncStorage, toAsyncProvider, MemoryProvider, NativeProvider, NodeProvider} from '../'

test('AsyncStorage', async (ava) => {
  let storage = new AsyncStorage()
  let mem = new MemoryProvider()
  let provider = toAsyncProvider(mem)
  provider.getItem = provider.get
  provider.setItem = provider.set
  provider.removeItem = provider.remove
  provider.getAllKeys = () => {
    return new Promise((resolve) => {
      resolve(Object.keys(mem.store))
    })
  }
  provider.multiRemove = (keys) => {
    return Promise.all(keys.map((key) => provider.remove(key))).then(() => Promise.resolve(keys))
  }
  storage.setProvider(new NativeProvider(provider))

  await storage.set('a', 1)
  ava.is(await storage.has('a'), true)
  await storage.remove('a')
  ava.is(await storage.has('a'), false)

  await storage.set('b', 'b')
  await storage.set('b', [])
  await storage.set('b', [1])
  ava.is(await storage.has('b'), true)
  ava.deepEqual(await storage.get('b'), [1])

  await storage.set('c', {x: 1})
  ava.deepEqual(await storage.get('c'), {x: 1})

  await storage.clear()
  ava.is(await storage.has('c'), false)
})

test('NodeProvider', async (ava) => {
  let storage = new AsyncStorage()
  let provider = NodeProvider({
    fs,
    path,
    root: path.resolve(__dirname, 'fixtures/cache')
  })
  storage.setProvider(new NativeProvider(provider))

  await storage.set('a', 1)
  ava.is(await storage.has('a'), true)
  await storage.remove('a')
  ava.is(await storage.has('a'), false)

  await storage.set('b', 'b')
  await storage.set('b', [])
  await storage.set('b', [1])
  ava.is(await storage.has('b'), true)
  ava.deepEqual(await storage.get('b'), [1])

  await storage.set('c', {x: 1})
  ava.deepEqual(await storage.get('c'), {x: 1})

  await storage.clear('', ['.gitkeep'])
  ava.is(await storage.has('c'), false)
})
