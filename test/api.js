import test from 'ava'
import {Storage, AsyncStorage} from '../'
import {isFunction, isObject} from 'sav-util'

test('Storage#Api', ava => {
  ava.true(isFunction(Storage))
  let storage = new Storage()
  ava.true(isObject(storage))
  ava.true(isFunction(storage.use))
  ava.true(isFunction(storage.provider))
  ava.true(isFunction(storage.get))
  ava.true(isFunction(storage.has))
  ava.true(isFunction(storage.remove))
  ava.true(isFunction(storage.set))
  ava.true(isFunction(storage.clear))
  ava.true(isFunction(storage.module))
  ava.true(isFunction(storage._prefix))
})

test('AsyncStorage#Api', ava => {
  ava.true(isFunction(AsyncStorage))
  let storage = new AsyncStorage()
  ava.true(isObject(storage))
  ava.true(isFunction(storage.setProvider))
  ava.true(isFunction(storage.setPrefix))
  ava.true(isFunction(storage.get))
  ava.true(isFunction(storage.has))
  ava.true(isFunction(storage.remove))
  ava.true(isFunction(storage.set))
  ava.true(isFunction(storage.clear))
  ava.true(isFunction(storage.module))
})
