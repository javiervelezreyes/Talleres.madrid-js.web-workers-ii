import Worker from '../../src/helpers/helper.worker.js'
import Logger from '../../src/helpers/helper.logger.js'
import Shared from '../../src/shared/shared.js'


const READ  = 'READ'
const DELAY = 5

let worker  = Worker (self)
let logger  = Logger.Reader
let manager = Shared.manager
let readers = Shared.readers

worker.doForever (async function (id) {

  await manager.send ({
    id,
    type : READ
  })

  let data = await readers[id].receive ()

  logger.reading (data)

  await worker.wait (DELAY)

})