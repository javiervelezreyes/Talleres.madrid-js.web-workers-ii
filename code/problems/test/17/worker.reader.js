import Worker from '../../src/helpers/helper.worker.js'
import Logger from '../../src/helpers/helper.logger.js'
import Shared from '../../src/shared/shared.js'


const DELAY = 5

let worker  = Worker (self)
let logger  = Logger.Reader
let read    = Shared.read
let readers = Shared.readers

worker.doForever (async function (id) {

  await read.send ({ id })

  let data = await readers[id].receive ()

  logger.reading (data)

  await worker.wait (DELAY)

})