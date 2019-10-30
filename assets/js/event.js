class EventEmiter {
  constructor() {
    //维护一个对象
    this.instance = null
    this._events = {}
  }

  static getInstance() {
    if (!this.instance) {
      this.instance = new EventEmiter();
    }
    return this.instance;
  }

  on(event, callback) {
    if (this._events[event]) {
      //如果有就放一个新的
      this._events[event].push(callback);
    } else {
      //如果没有就创建一个数组
      this._events[event] = [callback]
    }
  }
  emit(event, ...rest) {
    if (this._events[event]) { //循环一次执行
      this._events[event].forEach((item) => {
        item.apply(this, rest)
      });
    }
  }
  remove(event, callback) {
    if (this._events[event]) {
      //当前数组和传递过来的callback相等则移除掉
      this._events[event] =
        this._events[event].filter(item => item !== callback);
    }
  }
  once(event, callback) {
    function one() {
      //在one函数运行原来的函数，只有将one清空
      callback.apply(this, arguments);
      //先绑定 执行后再删除
      this.remove(event, one);
    }
    this.on(event, one);
    //此时emit触发会执行此函数，会给这个函数传递rest参数
  }
}

export const $event = EventEmiter.getInstance()