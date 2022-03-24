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

let isFull     = async x => (await x.get ()).length == MAX
let getWaiting = async x => (await x.get ())

worker.doForever (async function (n) {

  await nWriters.inc  ()
  await lWriters.wait ()
  await nWriters.dec  ()

  await buffer.write (n), await worker.wait (DELAY)
  await buffer.write (n), await worker.wait (DELAY)
  await buffer.write (n), await worker.wait (DELAY)

  await lock.wait ()
    let readers = await getWaiting (nReaders)
    let writers = await getWaiting (nWriters)
         if (writers > readers && !await isFull (buffer)) lWriters.signal ()
    else if (readers > writers)                           lReaders.signal ()
    else lReaders.signal ()
  await lock.signal ()

  logger.writing ([n, n, n])

})