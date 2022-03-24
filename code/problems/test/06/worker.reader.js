import Worker from '../../src/helpers/helper.worker.js'
import Logger from '../../src/helpers/helper.logger.js'
import Shared from '../../src/shared/shared.js'


const DELAY = .3
const SLEEP = 5
const MIN   = 0

let worker   = Worker (self)
let logger   = Logger.Reader
let buffer   = Shared.buffer
let lock     = Shared.lock
let lReaders = Shared.lReaders
let lWriters = Shared.lWriters
let nReaders = Shared.nReaders
let nWriters = Shared.nWriters

let isEmpty    = async x => (await x.get ()).length == MIN
let getWaiting = async x => (await x.get ())

worker.doForever (async function () {

  await worker.wait (SLEEP)

  await nReaders.inc  ()
  await lReaders.wait ()
  await nReaders.dec  ()

  let n = [
    (await worker.wait (DELAY), await buffer.read ()),
    (await worker.wait (DELAY), await buffer.read ()),
    (await worker.wait (DELAY), await buffer.read ())
  ]

  await lock.wait ()
    let readers = await getWaiting (nReaders)
    let writers = await getWaiting (nWriters)
         if (readers > writers && !await isEmpty (buffer)) lReaders.signal ()
    else if (writers > readers)                            lWriters.signal ()
    else lWriters.signal ()
  await lock.signal ()

  logger.reading (n)

})