function Atom (n) {

  function get () {
    return n
  }

  function set (x) {
    n = x
  }

  function inc (x) {
    x = x || 1
    n = n + x
  }

  function dec (x) {
    x = x || 1
    n = n - x
  }

  return {
    get,
    set,
    inc,
    dec
  }

}

export default Atom