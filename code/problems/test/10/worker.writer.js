import Worker from '../../src/helpers/helper.worker.js'
import Logger from '../../src/helpers/helper.logger.js'
import Shared from '../../src/shared/shared.js'


const DELAY = .3

let worker  = Worker (self)
let logger  = Logger.Writer
let monitor = Shared.monitor

worker.doForever (async function (n) {

  await monitor.write (n), await worker.wait (DELAY)
  await monitor.write (n), await worker.wait (DELAY)
  await monitor.write (n), await worker.wait (DELAY)

  logger.writing ([n, n, n])

})