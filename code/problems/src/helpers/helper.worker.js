const MESSAGE = 'message'
const EXECUTE = 'execute'
const MIN     = .5
const MAX     = 3
const ON      = true
const OFF     = false

function worker (self) {

  function doOnce (fn) {
    self.addEventListener (MESSAGE, async function ({ data }) {
      let { type  } = data
      let { id    } = data
      let { state } = data
      !!(type == EXECUTE) && (state == ON) && await fn (id)
    })
  }

  function doForever (fn, delay) {
    let isOn = OFF
    async function execute (id) {
      while (isOn) {
        delay && await wait (delay)
        await fn (id)
      }
    }
    self.addEventListener (MESSAGE, async function ({ data }) {
      let { type  } = data
      let { id    } = data
      let { state } = data
      !!(type == EXECUTE) && (state == ON)  && (isOn = ON) && await execute (id)
      !!(type == EXECUTE) && (state == OFF) && (isOn = OFF)
    })
  }

  function wait (max, min) {
    min = 1000 * (min || MIN)
    max = 1000 * (max || MAX)
    let seed  = Math.random ()
    let delay = min + (max - min) * seed | 0
    return new Promise (function (ok) {
      setTimeout (ok, delay)
    })

  }

  return {
    doOnce,
    doForever,
    wait
  }

}


export default worker
