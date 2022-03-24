import Worker from '../../src/helpers/helper.worker.js'
import Logger from '../../src/helpers/helper.logger.js'
import Shared from '../../src/shared/shared.js'


const DELAY = .3

let worker  = Worker (self)
let logger  = Logger.Writer
let wBegin  = Shared.wBegin
let wEnd    = Shared.wEnd
let writers = Shared.writers
let buffer  = Shared.buffer

worker.doForever (async function (id) {

  await wBegin.send (id)
  await writers[id].receive ()

    let n = id
    await buffer.write (n), await worker.wait (DELAY)
    await buffer.write (n), await worker.wait (DELAY)
    await buffer.write (n), await worker.wait (DELAY)

  await wEnd.send (id)

  logger.writing ([n, n, n])

})