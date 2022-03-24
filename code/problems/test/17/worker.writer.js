import Worker from '../../src/helpers/helper.worker.js'
import Logger from '../../src/helpers/helper.logger.js'
import Shared from '../../src/shared/shared.js'


const DELAY = 5

let worker  = Worker (self)
let logger  = Logger.Writer
let write   = Shared.write

worker.doForever (async function (id) {

  let data = [id, id, id]
  await write.send ({ id, data })

  logger.writing (data)

  await worker.wait (DELAY)

})