import Worker from '../../src/helpers/helper.worker.js'
import Shared from '../../src/shared/shared.js'
import Select from '../../src/shared/models/model.select.js'


const READ    = 'READ'
const WRITE   = 'WRITE'
const OK      = true
const ON      = true
const OFF     = false
const MIN     = 0
const MAX     = 15
const DELAY   = .1

let worker   = Worker (self)
let rBegin   = Shared.rBegin
let wBegin   = Shared.wBegin
let rEnd     = Shared.rEnd
let wEnd     = Shared.wEnd
let readers  = Shared.readers
let writers  = Shared.writers
let buffer   = Shared.buffer
let reading  = OFF
let writing  = OFF
let turn     = WRITE

let isEmpty  = async x => (await x.get ()).length == MIN
let isFull   = async x => (await x.get ()).length == MAX

worker.doForever (async function () {

  async function canRead    ()   { return !reading  && !writing && turn == READ    }
  async function canWrite   ()   { return !reading  && !writing && turn == WRITE   }
  async function beginRead  (id) {  (reading = ON)  && await readers[id].send (OK) }
  async function beginWrite (id) {  (writing = ON)  && await writers[id].send (OK) }
  async function endRead    ()   { !(reading = OFF) && (turn = !await isEmpty (buffer) ? READ  : WRITE) }
  async function endWrite   ()   { !(writing = OFF) && (turn = !await isFull  (buffer) ? WRITE : READ)  }

  await Select (rBegin, wBegin, rEnd, wEnd)
    .when (rBegin) .and (canRead)  .then (beginRead)
    .when (wBegin) .and (canWrite) .then (beginWrite)
    .when (rEnd)                   .then (endRead)
    .when (wEnd)                   .then (endWrite)
  .receive ()


  await worker.wait (DELAY)

})