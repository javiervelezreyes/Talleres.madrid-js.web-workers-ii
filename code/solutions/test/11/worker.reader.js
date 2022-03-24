import Worker from '../../src/helpers/helper.worker.js'
import Logger from '../../src/helpers/helper.logger.js'
import Shared from '../../src/shared/shared.js'


const DELAY = 5

let worker  = Worker (self)
let logger  = Logger.Reader
let monitor = Shared.monitor

worker.doForever (async function () {

  await worker.wait (DELAY)

  let n = await monitor.read ()

  logger.reading (n)

})