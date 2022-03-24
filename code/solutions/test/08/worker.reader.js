import Worker from '../../src/helpers/helper.worker.js'
import Logger from '../../src/helpers/helper.logger.js'
import Shared from '../../src/shared/shared.js'


const DELAY = .3

let worker   = Worker (self)
let logger   = Logger.Reader
let buffer   = Shared.buffer
let lock     = Shared.lock
let sReaders = Shared.sReaders
let sWriters = Shared.sWriters

worker.doForever (async function () {

  await sReaders.wait ()

    await lock.wait ()
      let n = [
        (await worker.wait (DELAY), await buffer.read ()),
        (await worker.wait (DELAY), await buffer.read ()),
        (await worker.wait (DELAY), await buffer.read ())
      ]
    await lock.signal ()

  await sWriters.signal ()

  logger.reading (n)

})