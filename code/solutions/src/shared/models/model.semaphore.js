
let isClosed = x => x == 0

function Lock (n) {

  let state = n
  let lock  = []

  function wait () {
    return new Promise (function (worker) {
      if (isClosed (state)) lock = [...lock, worker]
      else {
        state--
        worker ()
      }
    })
  }

  function signal () {
    let [worker, ...next] = lock
    lock = next
    if (worker) worker ()
    else state++
  }

  return {
    wait,
    signal
  }

}

export default Lock