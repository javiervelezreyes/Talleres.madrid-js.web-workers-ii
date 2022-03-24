import Workers   from '../../src/helpers/helper.workers.js'
import Shared    from '../../src/shared/shared.js'
import Buffer    from '../../src/shared/data/data.buffer.js'
import Monitor   from '../../src/shared/models/model.monitor.js'
import Condition from '../../src/shared/models/model.condition.js'


const READER  = './worker.reader.js'
const WRITER  = './worker.writer.js'

const READERS = 5
const WRITERS = 5

const MIN = 0
const MAX = 15

const ON  = true
const OFF = false

let isEmpty = x => x.get ().length == MIN
let isFull  = x => x.get ().length == MAX

let buffer = Buffer ([])
let shared = Shared.create ({
  buffer  : buffer,
  monitor : Monitor ({
    cReaders : Condition,
    cWriters : Condition,
    reading  : OFF,
    writing  : OFF,
    nReaders : 0,
    nWriters : 0,

    async beginRead () {
      let wait = (
           this.reading
        || this.writing
        || this.nReaders
        || this.nWriters && !isFull (buffer)
        || isEmpty (buffer)
      )
      let readers = this.cReaders
      if (wait) {
        this.nReaders++
        await readers.wait ()
        this.nReaders--
      }
      this.reading = ON
    },

    async endRead () {
      let readers  = this.cReaders
      let writers  = this.cWriters
      this.reading = OFF
           if (this.nWriters)                      await writers.signal ()
      else if (this.nReaders && !isEmpty (buffer)) await readers.signal ()
      else await writers.signal ()
    },

    async beginWrite () {
      let wait = (
           this.reading
        || this.writing
        || this.nWriters
        || this.nReaders && !isEmpty (buffer)
        || isFull (buffer)
      )
      let writers = this.cWriters
      if (wait) {
        this.nWriters++
        await writers.wait ()
        this.nWriters--
      }
      this.writing = ON
    },

    async endWrite () {
      let readers  = this.cReaders
      let writers  = this.cWriters
      this.writing = OFF
      this.nWriters--
           if (this.nReaders)                     await readers.signal ()
      else if (this.nWriters && !isFull (buffer)) await writers.signal ()
      else await readers.signal ()
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
