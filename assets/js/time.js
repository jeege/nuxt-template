
//时间格式化
const timeFormat = t => {
  return t < 10 ? "0" + t : t;
}
//倒计时
const getTime = msd => {
  let time = parseFloat(msd);
  if (time != null && time != "") {
    if (time > 60 && time < 60 * 60) {
      time =
        "00:" +
        timeFormat(parseInt(time / 60.0)) +
        ":" +
        timeFormat(parseInt(time % 60)) +
        "";
    } else if (time >= 60 * 60 && time < 60 * 60 * 24) {
      let h = parseInt(time / (60 * 60));
      let f = time - h * 60 * 60;
      time =
        timeFormat(h) +
        ":" +
        timeFormat(parseInt(f / 60.0)) +
        ":" +
        timeFormat(parseInt(f % 60)) +
        "";
    } else if (time > 60 * 60 * 24) {
      let d = parseInt(time / (60 * 60 * 24));
      let h = parseInt((time - d * 60 * 60 * 24) / (60 * 60));
      let f = time - d * 60 * 60 * 24 - h * 60 * 60;
      time =
        d +
        "天" +
        timeFormat(h) +
        ":" +
        timeFormat(parseInt(f / 60.0)) +
        ":" +
        timeFormat(parseInt(f % 60)) +
        "";
    } else {
      time = "00:00:" + timeFormat(parseInt(time));
    }
  }
  return time;
}

export {
  getTime
}