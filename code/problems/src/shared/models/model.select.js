
function Select () {

  function when (channel) {
    return this
  }

  function and (check) {
    return this
  }

  function then (task) {
    return this
  }

  function end () {
    async function receive () {

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
