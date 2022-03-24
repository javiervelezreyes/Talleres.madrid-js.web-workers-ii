import Console from './helper.console.js'


const MODULE  = 'module'
const EXECUTE = 'execute'
const TYPE    = { type : MODULE }
const ON      = { type : EXECUTE, state: true  }
const OFF     = { type : EXECUTE, state: false }

function Workers (path) {

  function Agent (worker, id) {
    let agent = worker
    agent.id    = id
    agent.start = function () { worker.postMessage ({ ...ON,  id }) }
    agent.stop  = function () { worker.postMessage ({ ...OFF, id }) }
    agent.use   = function (shared) { shared.register (worker)      }
    Console.watch (agent)
    return agent
  }

  function Agents (agents) {
    agents.start = function () { agents.forEach (x => x.start ()) }
    agents.stop  = function () { agents.forEach (x => x.stop  ()) }
    agents.use   = function (shared) { agents.forEach (x => x.use (shared)) }
    return agents
  }



  function create (n) {
    let idx    = 0
    let agents = []
    while (idx < n) {
      let worker = new Worker (path, TYPE)
      let agent  = Agent (worker, idx++)
      agents.push (agent)
    }
    return Agents (agents)
  }

  return { create }
}

export default Workers