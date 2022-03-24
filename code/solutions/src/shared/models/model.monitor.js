import Condition from './model.condition.js'
import Lock      from './model.lock.js'


const LOCK = Symbol.for ('Lock')

let isFunction  = x => typeof (x) == 'function'
let isCondition = x => x == Condition
let isValue     = x => !isFunction (x) && !isCondition (x)

function Monitor (shared) {

  let lock = Lock (Lock.OPEN)

  function asLocked (monitor, fn) {
    return async function (...args) {
      await lock.wait ()
      let out = await fn.call (monitor, ...args)
      await lock.signal ()
      return out
    }
  }

  let monitor   = shared
  monitor[LOCK] = lock
  for (let key in shared) {
    let value = shared[key]
         if (isValue     (value)) monitor[key] = value
    else if (isCondition (value)) monitor[key] = value (monitor)
    else if (isFunction  (value)) monitor[key] = asLocked (monitor, value)
  }

  return monitor

}

export default Monitor