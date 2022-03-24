import Worker from '../../src/helpers/helper.worker.js'
import Logger from '../../src/helpers/helper.logger.js'
import Shared from '../../src/shared/shared.js'


const DELAY = 5

let worker  = Worker (self)
let logger  = Logger.Writer
let monitor = Shared.monitor

worker.doForever (async function (n) {

  await worker.wait (DELAY)

  await monitor.write (n)

  logger.writing ([n, n, n])

})