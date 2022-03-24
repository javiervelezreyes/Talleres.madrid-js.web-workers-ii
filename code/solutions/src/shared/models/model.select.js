const TRUE = () => true
const KILL = () => {}

function Select () {

  let rules = []
  let rule

  function when (channel) {
    rule = { channel }
    return this
  }

  function and (check) {
    rule = { ...rule, check }
    return this
  }

  function then (task) {
    rule = { ...rule, task }
    rule.check = rule.check || TRUE
    rules.push (rule)
    return this
  }

  function end () {
    async function receive () {
      let promises = []
      let tasks    = []

      let found    = false
      for (let idx in rules) {
        let promise = new Promise (async function (ok, ko) {
          promises[idx] = { ok, ko }
          let rule    = rules[idx]
          let channel = rule.channel
          let message = await channel.get ()
          let guard   = await rule.check (message)
          if (!found && guard) {
            found = true
            for (let idy in promises) {
               (idy == idx) && promises[idy].ok ()
              !(idy == idx) && promises[idy].ko ()
            }
            await rule.task (message)
            await channel.receive ()
          }
        }).catch (KILL)
        tasks.push (promise)
      }
      return Promise.race (tasks)
    }
    return { receive }
  }

  async function receive () {
    let select = end ()
    await select.receive ()
  }

  return {
    when,
    and,
    then,
    end,
    receive
  }

}

export default Select
