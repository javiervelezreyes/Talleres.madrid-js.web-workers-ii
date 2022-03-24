import Id from '../helpers/helper.id.js'


const MESSAGE  = 'message'
const REQUEST  = 'request'
const RESPONSE = 'response'

function Shared () {

  let Pending = {}

  self.addEventListener (MESSAGE, function ({ data }) {
    let { type } = data
    let { id   } = data
    if (type == RESPONSE) {
      let { error } = data
      let { out   } = data

      let {ok, ko} = Pending[id]
       error && ko (error)
      !error && ok (out)
      delete Pending[id]
    }
  })

  function GetProxy (keys) {
    keys = keys || []
    return new Proxy (function () {}, {
      get (target, key) {
        return GetProxy ([...keys, key])
      },
      apply (target, self, args) {
        let id = Id ()
        return new Promise (function (ok, ko) {
          postMessage ({
            type: REQUEST,
            id,
            keys,
            args
          })
          Pending[id] = { ok, ko }
        })
      }
    })
  }

  return GetProxy ()

}

export default Shared ()