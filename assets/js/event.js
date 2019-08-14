class Event {
  constructor() {
    this.ev = {}
  }
  on(type, fn) {
    if (!this.ev[type]) {
      this.ev[type] = fn
    }
  }
  emmit(type) {
    if (this.ev[type]) {
      this.ev[type]()
      delete this.ev[type]
    }
  }
}

const init = () => {
  return new Event()
}

const gmEvent = (function (fn) {
  let result
  return function () {
    return result || (result = fn.apply(this, arguments));
  }
})(init)()

export default gmEvent