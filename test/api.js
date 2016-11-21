import test from 'ava'
import {Storage} from '../'
import {isFunction} from 'sav-util'

test('Storage#api', ava => {
  ava.true(isFunction(Storage))
})
