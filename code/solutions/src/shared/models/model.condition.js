const LOCK = Symbol.for ('Lock')

function Condition (monitor) {

  let lock    = monitor[LOCK]
  let waiting = []
  let nWaits  = 0

  async function wait () {
    nWaits++
    await lock.signal ()
    return new Promise (function (worker) {
      waiting.push (worker)
    })
  }

  async function signal () {
    if (nWaits) {
      nWaits--
      let [worker, ...next] = waiting
      waiting = next
      if (worker) worker ()
    }
  }

  return {
    wait,
    signal
  }

}

export default Condition