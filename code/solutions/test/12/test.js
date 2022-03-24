import Workers   from '../../src/helpers/helper.workers.js'
import Shared    from '../../src/shared/shared.js'
import Buffer    from '../../src/shared/data/data.buffer.js'
import Monitor   from '../../src/shared/models/model.monitor.js'
import Condition from '../../src/shared/models/model.condition.js'


const READER  = './worker.reader.js'
const WRITER  = './worker.writer.js'

const READERS = 5
const WRITERS = 5

const ON  = true
const OFF = false

let buffer = Buffer ([])
let shared = Shared.create ({
  buffer  : buffer,
  monitor : Monitor ({
    cReaders : Condition,
    cWriters : Condition,
    reading  : OFF,
    writing  : OFF,

    async beginRead () {
      let bussy   = this.reading || this.writing
      let readers = this.cReaders
      bussy && await readers.wait ()
      this.reading = ON
    },

    async endRead () {
      let writers  = this.cWriters
      this.reading = OFF
      await writers.signal ()
    },

    async beginWrite () {
      let bussy   = this.reading || this.writing
      let writers = this.cWriters
      bussy && await writers.wait ()
      this.writing = ON
    },

    async endWrite () {
      let readers  = this.cReaders
      this.writing = OFF
      await readers.signal ()
    }
  })
})

let RFactory = Workers (READER)
let WFactory = Workers (WRITER)

let Readers = RFactory.create (READERS)
let Writers = WFactory.create (WRITERS)

Readers.use (shared)
Writers.use (shared)

export { Readers }
export { Writers }
