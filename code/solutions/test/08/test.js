import Workers   from '../../src/helpers/helper.workers.js'
import Shared    from '../../src/shared/shared.js'
import Buffer    from '../../src/shared/data/data.buffer.js'
import Semaphore from '../../src/shared/models/model.semaphore.js'


const READER  = './worker.reader.js'
const WRITER  = './worker.writer.js'

const READERS = 5
const WRITERS = 5
const OPEN    = 1
const NONE    = 0

let shared = Shared.create ({
  buffer    : Buffer ([]),
  lock      : Semaphore (OPEN),
  sReaders  : Semaphore (NONE),
  sWriters  : Semaphore (WRITERS),
})

let RFactory = Workers (READER)
let WFactory = Workers (WRITER)

let Readers = RFactory.create (READERS)
let Writers = WFactory.create (WRITERS)

Readers.use (shared)
Writers.use (shared)

export { Readers }
export { Writers }