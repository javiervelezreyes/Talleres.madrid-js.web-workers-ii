import Worker from '../../src/helpers/helper.worker.js'
import Logger from '../../src/helpers/helper.logger.js'
import Shared from '../../src/shared/shared.js'


const DELAY = 3

let worker = Worker (self)
let logger = Logger.Writer
let buffer = Shared.buffer

worker.doForever (async function (n) {

  await worker.wait (DELAY)

  await buffer.write (n)

  logger.writing (n)

})