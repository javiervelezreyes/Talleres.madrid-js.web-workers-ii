import Worker from '../../src/helpers/helper.worker.js'
import Logger from '../../src/helpers/helper.logger.js'
import Shared from '../../src/shared/shared.js'


const DELAY = 3

let worker = Worker (self)
let logger = Logger.Reader
let buffer = Shared.buffer

worker.doForever (async function () {

  await worker.wait (DELAY)

  let n = await buffer.read ()

  logger.reading (n)

})