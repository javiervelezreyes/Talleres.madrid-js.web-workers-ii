import Worker from '../../src/helpers/helper.worker.js'
import Logger from '../../src/helpers/helper.logger.js'
import Shared from '../../src/shared/shared.js'


const WRITE = 'WRITE'
const DELAY = 10

let worker  = Worker (self)
let logger  = Logger.Writer
let manager = Shared.manager

worker.doForever (async function (id) {

  let data = [id, id, id]
  await manager.send ({
    id,
    data,
    type : WRITE
  })

  logger.writing (data)

  await worker.wait (DELAY)

})