import Worker from '../../src/helpers/helper.worker.js'
import Shared from '../../src/shared/shared.js'
import Buffer from '../../src/shared/data/data.buffer.js'
import Select from '../../src/shared/models/model.select.js'


const DELAY = 1
const MIN   = 0
const MAX   = 5

let worker  = Worker (self)
let read    = Shared.read
let write   = Shared.write
let readers = Shared.readers
let buffer  = Buffer ([])

let canRead  = buffer.get ().length > MIN
let canWrite = buffer.get ().length < MAX

worker.doForever (async function () {

  async function doRead ({ id }) {
    let data    = await buffer.read ()
    let channel = readers[id]
    await channel.send (data)
  }

  async function doWrite ({ data }) {
    await buffer.write (data)
  }

  await Select (read, write)
    .when (read)  .and (canRead)  .then (doRead)
    .when (write) .and (canWrite) .then (doWrite)
  .receive ()

  await worker.wait (DELAY)

})