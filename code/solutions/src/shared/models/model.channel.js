import Lock from './model.lock.js'


function Channel () {

  let messages = []
  let waiting  = Lock (Lock.CLOSED)

  async function get () {
    await waiting.wait ()
    let [first] = messages
    await waiting.signal ()
    return first
  }

  async function send (message) {
    messages = [...messages, message]
    await waiting.signal ()
  }

  async function receive () {
    await waiting.wait ()
    let [first, ...next] = messages
    messages = next
    if (messages.length > 0) await waiting.signal ()
    return first
  }

  return {
    get,
    send,
    receive
  }

}

export default Channel