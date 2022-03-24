const OPEN   = true
const CLOSED = false

function Lock (init) {

  function wait () {

  }

  function signal () {

  }

  return {
    wait,
    signal
  }

}

Lock.OPEN   = OPEN
Lock.CLOSED = CLOSED

export default Lock