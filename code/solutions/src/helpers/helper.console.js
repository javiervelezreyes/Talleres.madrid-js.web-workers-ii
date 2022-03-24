const MESSAGE = 'message'
const LOG     = 'log'
const TYPE    = 'div'
const CLASS   = 'container'

function Console () {

  function watch (agents) {
    agents = Array.isArray (agents) && agents || [agents]
    for (let agent of agents) {
      agent.addEventListener (MESSAGE, function ({ data }) {
        let { type } = data
        if (type == LOG) {
          let { id      } = data
          let { family  } = data
          let { message } = data

          let nodes = document.getElementById (family)
          let node  = document.getElementById (id)
          if (!node) {
            node = document.createElement (TYPE)
            node.id = id
            node.classList.add (CLASS)
            nodes.appendChild (node)
          }
           node.innerHTML && (node.innerHTML = message + node.innerHTML)
          !node.innerHTML && (node.innerHTML = message)
        }
      })
    }

  }

  return { watch }
}

export default Console ()