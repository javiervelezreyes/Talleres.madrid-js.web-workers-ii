import Worker from '../../src/helpers/helper.worker.js'
import Logger from '../../src/helpers/helper.logger.js'
import Shared from '../../src/shared/shared.js'


const DELAY = .3
const MAX   = 15

let worker   = Worker (self)
let logger   = Logger.Writer
let buffer   = Shared.buffer
let lock     = Shared.lock
let lReaders = Shared.lReaders
let lWriters = Shared.lWriters
let nReaders = Shared.nReaders
let nWriters = Shared.nWriters

let isFull    = async x => (await x.get ()).length == MAX
let isWaiting = async x => (await x.get ()) > 0

worker.doForever (async function (n) {

  await nWriters.inc  ()
  await lWriters.wait ()
  await nWriters.dec  ()

  await buffer.write (n), await worker.wait (DELAY)
  await buffer.write (n), await worker.wait (DELAY)
  await buffer.write (n), await worker.wait (DELAY)

  await lock.wait ()
         if (await isWaiting (nWriters) && !await isFull (buffer)) lWriters.signal ()
    else if (await isWaiting (nReaders))                           lReaders.signal ()
    else lWriters.signal ()
  await lock.signal ()

  logger.writing ([n, n, n])

})