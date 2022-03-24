let OPEN   = true
let CLOSED = false


let isClosed = x => x == CLOSED

function Lock (init) {

  let state = init
  let lock  = []

  function wait () {
    return new Promise (function (worker) {
      if (isClosed (state)) lock = [...lock, worker]
      else {
        state = CLOSED
        worker ()
      }
    })
  }

  function signal () {
    let [worker, ...next] = lock
    lock = next
    if (worker) worker ()
    else state = OPEN
  }

  return {
    wait,
    signal
  }

}

Lock.OPEN   = OPEN
Lock.CLOSED = CLOSED

export default Lock