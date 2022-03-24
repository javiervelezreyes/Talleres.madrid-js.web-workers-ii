import Logger from '../../helpers/helper.logger.js'


let logger = Logger.Shared

function Buffer (data) {

  function get () {
    return data
  }

  function read () {
    let [x, ...xs] = data
    data = xs
    logger.reading (x, xs)
    return x
  }

  function write (x) {
    let xs = data
    data = [...xs, x]
    logger.writing (x, data)
  }

  return {
    get,
    read,
    write
  }

}

export default Buffer