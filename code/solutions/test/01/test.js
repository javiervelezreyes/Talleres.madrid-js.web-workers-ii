import Workers from '../../src/helpers/helper.workers.js'
import Shared  from '../../src/shared/shared.js'
import Buffer  from '../../src/shared/data/data.buffer.js'


const READER  = './worker.reader.js'
const WRITER  = './worker.writer.js'

const READERS = 5
const WRITERS = 5

let shared = Shared.create ({
  buffer : Buffer ([])
})

let RFactory = Workers (READER)
let WFactory = Workers (WRITER)

let Readers = RFactory.create (READERS)
let Writers = WFactory.create (WRITERS)

Readers.use (shared)
Writers.use (shared)

export { Readers }
export { Writers }