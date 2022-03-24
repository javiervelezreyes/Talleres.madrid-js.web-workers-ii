import Worker from '../../src/helpers/helper.worker.js'
import Logger from '../../src/helpers/helper.logger.js'
import Shared from '../../src/shared/shared.js'


const DELAY = .3
const SLEEP = 30

let worker  = Worker (self)
let logger  = Logger.Reader
let rBegin  = Shared.rBegin
let rEnd    = Shared.rEnd
let readers = Shared.readers
let buffer  = Shared.buffer

worker.doForever (async function (id) {

  await worker.wait (SLEEP)

  await rBegin.send (id)
  await readers[id].receive ()

    let n = [
      (await worker.wait (DELAY), await buffer.read ()),
      (await worker.wait (DELAY), await buffer.read ()),
      (await worker.wait (DELAY), await buffer.read ())
    ]

  await rEnd.send (id)

  logger.reading (n)

})