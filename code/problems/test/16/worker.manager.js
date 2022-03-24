import Worker from '../../src/helpers/helper.worker.js'
import Shared from '../../src/shared/shared.js'
import Buffer from '../../src/shared/data/data.buffer.js'


const READ  = 'READ'
const WRITE = 'WRITE'
const DELAY = .1

let worker  = Worker (self)
let manager = Shared.manager
let readers = Shared.readers
let buffer  = Buffer ([])

let isRead  = x => x.type == READ
let isWrite = x => x.type == WRITE

worker.doForever (async function () {

  let message  = await manager.receive ()
  let { id   } = message
  let { data } = message

  isRead (message) && (async function () {
    let data    = await buffer.read ()
    let channel = readers[id]
    await channel.send (data)
  })()

  isWrite (message) && (async function () {
    await buffer.write (data)
  })()

  await worker.wait (DELAY)

})