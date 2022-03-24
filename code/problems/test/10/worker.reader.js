import Worker from '../../src/helpers/helper.worker.js'
import Logger from '../../src/helpers/helper.logger.js'
import Shared from '../../src/shared/shared.js'


const DELAY = .3

let worker  = Worker (self)
let logger  = Logger.Reader
let monitor = Shared.monitor

worker.doForever (async function () {

  let n = [
    (await worker.wait (DELAY), await monitor.read ()),
    (await worker.wait (DELAY), await monitor.read ()),
    (await worker.wait (DELAY), await monitor.read ())
  ]

  logger.reading (n)

})