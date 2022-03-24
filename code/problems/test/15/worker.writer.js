import Worker from '../../src/helpers/helper.worker.js'
import Logger from '../../src/helpers/helper.logger.js'
import Shared from '../../src/shared/shared.js'


const DELAY = .3

let worker  = Worker (self)
let logger  = Logger.Writer
let monitor = Shared.monitor
let buffer  = Shared.buffer

worker.doForever (async function (n) {

  await monitor.beginWrite ()

  await buffer.write (n), await worker.wait (DELAY)
  await buffer.write (n), await worker.wait (DELAY)
  await buffer.write (n), await worker.wait (DELAY)

  await monitor.endWrite ()

  logger.writing ([n, n, n])

})