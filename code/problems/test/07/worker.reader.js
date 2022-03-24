import Worker from '../../src/helpers/helper.worker.js'
import Logger from '../../src/helpers/helper.logger.js'
import Shared from '../../src/shared/shared.js'


const DELAY = .3

let worker    = Worker (self)
let logger    = Logger.Reader
let buffer    = Shared.buffer
let semaphore = Shared.semaphore

worker.doForever (async function () {

  await semaphore.wait ()
    let n = [
      (await worker.wait (DELAY), await buffer.read ()),
      (await worker.wait (DELAY), await buffer.read ()),
      (await worker.wait (DELAY), await buffer.read ())
    ]
  await semaphore.signal ()

  logger.reading (n)

})