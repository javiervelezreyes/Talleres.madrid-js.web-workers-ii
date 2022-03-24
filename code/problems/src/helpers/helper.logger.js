import Id from './helper.id.js'


const SHARED  = 'shared'
const READER  = 'readers'
const WRITER  = 'writers'
const LOG     = 'log'
const EMPTY   = ''



let ok     = x  => x != undefined
let checkA = x  => ok (x)
let checkB = xs => !Array.isArray (xs) || xs.every (ok)
let ckeckC = xs => !Array.isArray (xs) || xs.every (x => x == xs[0])

function Logger (id, family) {

  function size (xs) {
    let n = xs.length
    if (n < 10) return ` (${n})`
    else        return `(${n})`
  }

  function reading (x, xs) {
    let text
     xs                   && (text = `<pre class="ok">${size (xs)} Reading [${x}] < [${xs}]</pre>`)
     xs && xs.length > 15 && (text = `<pre class="ko">[!] Buffer Overflow  ${size (xs)}</pre>`)
     xs && !ok(x)         && (text = `<pre class="ko">[!] Buffer Underflow (0)</pre>`)
    !xs                   && (text = `<pre class="ok">Reading [${x}]</pre>`)
    !xs && !checkA (x)    && (text = `<pre class="ko">Reading [-]   [!]</pre>`)
    !xs && !checkB (x)    && (text = `<pre class="ko">Reading [-]   [!]</pre>`)
    !xs && !ckeckC (x)    && (text = `<pre class="ko">Reading [${x}][!]</pre>`)
    log (text)
  }

  function writing (x, xs) {
    let text
     xs                   && (text = `<pre class="ok">${size (xs)} Writing [${x}] < [${xs}]</pre>`)
     xs && xs.length > 15 && (text = `<pre class="ko">[!] Buffer Overflow  ${size (xs)}</pre>`)
     xs && !ok(x)         && (text = `<pre class="ko">[!] Buffer Underflow (0)</pre>`)
    !xs                   && (text = `<pre class="ok">Writing [${x}]</pre>`)
    log (text)
  }

  function log (text) {
    text = text || EMPTY
    postMessage ({
      type: LOG,
      id,
      family,
      message: text
    })
  }

  log ()

  return {
    reading,
    writing,
    log
  }

}

function Factory () {
  return {
    get Shared () { return Logger (Id (), SHARED) },
    get Reader () { return Logger (Id (), READER) },
    get Writer () { return Logger (Id (), WRITER) },
  }
}

export default Factory ()