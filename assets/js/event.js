class Event {
  constructor() {
    this.ev = {}
  }
  on(type, fn) {
    if (this.ev[type]) {
      this.ev[type].push(fn)
    } else {
      this.ev[type] = [fn]
    }
  }
  emmit(type) {
    if (this.ev[type]) {
      this.ev[type].map(i => {
        i()
      })
    } else {
      console.log('没有注册的事件')
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