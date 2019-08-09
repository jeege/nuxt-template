// 获取token
// 参数为需要获取的键名
function getCookie(key, doc = document) {
  try {
    let arr = doc.cookie.split(';')
    for (let i = 0; i < arr.length; i++) {
      let tempArr = arr[i].split('=')
      if (tempArr[0].trim() == key) {
        return decodeURIComponent(tempArr[1].trim())
      }
    }
    return ''
  } catch (error) {
    return ''
  }
}
// 设置cookie
function setCookie(name, value, seconds) {
  seconds = seconds || 0;   //seconds有值就直接赋值，没有为0
  let expires = "";
  if (seconds != 0) {      //设置cookie生存时间
    let date = new Date();
    date.setTime(date.getTime() + (seconds * 1000));
    expires = "; expires=" + date.toGMTString();
  }
  document.cookie = name + "=" + escape(value) + expires + "; path=/";   //转码并赋值
}

// 获取当前是安卓还是苹果
function getPhone() {
  let u = navigator.userAgent
  let isAndroid = u.includes('Android') || u.includes('Adr')
  let isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
  if (isAndroid) {
    return 'android'
  } else if (isiOS) {
    return 'ios'
  } else {
    return '啥也不是'
  }
}

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




export { getCookie, setCookie, getPhone, getTime }
