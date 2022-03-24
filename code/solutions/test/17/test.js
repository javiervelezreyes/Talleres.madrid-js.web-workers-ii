import Workers from '../../src/helpers/helper.workers.js'
import Shared  from '../../src/shared/shared.js'
import Channel from '../../src/shared/models/model.channel.js'


const MANAGER  = './worker.manager.js'
const READER   = './worker.reader.js'
const WRITER   = './worker.writer.js'

const MANAGERS = 1
const READERS  = 5
const WRITERS  = 5

let Channels = x => Array (x).fill ().map (Channel)

let shared = Shared.create ({
  read    : Channel (),
  write   : Channel (),
  readers : Channels (READERS),
})

let MFactory = Workers (MANAGER)
let RFactory = Workers (READER)
let WFactory = Workers (WRITER)

let Manager = MFactory.create (MANAGERS)
let Readers = RFactory.create (READERS)
let Writers = WFactory.create (WRITERS)

Manager.use (shared)
Readers.use (shared)
Writers.use (shared)

export { Manager }
export { Readers }
export { Writers }
