import test from 'ava'
import {AsyncStorage, toAsyncProvider, MemoryProvider} from '../'

test('AsyncStorage', async (ava) => {
  let storage = new AsyncStorage()
  let provider = new MemoryProvider()

  storage.setProvider(toAsyncProvider(provider))
  ava.true(storage.provider !== provider)

  storage.setPrefix('async.')
  ava.true(storage.prefix === 'async.')

  await storage.set('a', 'b')
  ava.true(await storage.has('a'))
  ava.true(await storage.get('a') === 'b')

  await storage.remove('a')
  ava.true(await storage.get('a') === undefined)

  await storage.set('a', 'b')
  await storage.set('c', 'd')
  await storage.clear('', ['a'])
  ava.true(await storage.has('a'))

  await storage.clear('')
  ava.false(await storage.has('a'))

  await storage.set('null', null)
  ava.true(await storage.get('null') === null)

  await storage.set('undefined', undefined)
  ava.true(await storage.get('undefined') === undefined)

  provider.store['async.undefined'] = 'undefined'
  ava.true(await storage.get('undefined') === undefined)

  let us = storage.module((name) => 'User.')
  await us.set('age', 10)

  ava.true(await us.get('age') === await storage.get('User.age'))

  let us2 = storage.module('User.')
  ava.true(await us2.get('age') === await storage.get('User.age'))
})
