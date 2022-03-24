import Worker from '../../src/helpers/helper.worker.js'
import Logger from '../../src/helpers/helper.logger.js'
import Shared from '../../src/shared/shared.js'


const DELAY = 1

let worker = Worker (self)
let logger = Logger.Reader
let buffer = Shared.buffer

worker.doForever (async function () {

  let n = [
    (await worker.wait (DELAY), await buffer.read ()),
    (await worker.wait (DELAY), await buffer.read ()),
    (await worker.wait (DELAY), await buffer.read ())
  ]

  logger.reading (n)

})