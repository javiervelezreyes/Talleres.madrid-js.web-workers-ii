import Console from '../../src/helpers/helper.console.js'


const MESSAGE  = 'message'
const REQUEST  = 'request'
const RESPONSE = 'response'

function Shared () {

  let shared = {}

  function create (config) {
    shared = config
    Console.watch (window)
    return {
      register,
      unregister
    }
  }

  function process (worker) {
    return async function ({ data }) {
      let { type } = data
      if (type == REQUEST) {
        let { id   } = data
        let { keys } = data
        let { args } = data
        try {
          let target = shared
          for (let key of keys) {
            target = target[key]
          }
          let out = await target (...args)
          worker.postMessage ({ type: RESPONSE, id, out })
        }
        catch (e) { worker.postMessage ({ type: RESPONSE, id, error: { cause: e, keys } }) }
      }
    }
  }

  function register (worker) {
    worker.addEventListener (MESSAGE, process (worker))
  }

  function unregister (worker) {
    worker.removeEventListener (MESSAGE, process (worker))
  }

  return { create }
}


export default Shared ()