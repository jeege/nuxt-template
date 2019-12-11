/**
* @description 根据key值获取对应的cookie
* @param {String} key 传入的key  
* @param {Object} doc 查找的cookie所在的对象，默认为document，服务端可传入req.headers
* @return {String|Object} 返回查到的对应值，没查到返回null
*/
const getCookie = (key, doc = document) => {
  if(!doc.cookie) return
  return decodeURIComponent(doc.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*" + encodeURIComponent(key).replace(/[-.+*]/g, "\\$&") + "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1")) || null;
}

/**
* @description 客户端设置cookie
* @param {String} key 需要设置cookie的key值 
* @param {String} value 需要设置cookie的value值 
* @param {Number|String|Date} endTime 设置cookie的过期时间
* @param {String} sPath 例如 '/', '/mydir'。 如果没有定义，默认为当前文档位置的路径。
* @param {String} sDomain 例如 'example.com'，'.example.com'。 如果没有定义，默认为当前文档位置的路径的域名部分
* @param {Boolean} bSecure cookie只会被https传输 
*/
const setCookie = (key, value, endTime, sPath, sDomain, bSecure) => {
  if (!key || /^(?:expires|max\-age|path|domain|secure)$/i.test(key)) {
    return false;
  }
  let sExpires = "";
  if (endTime) {
    switch (endTime.constructor) {
      case Number:
        sExpires = endTime === Infinity ? "; expires=Fri, 31 Dec 9999 23:59:59 GMT" : "; max-age=" + endTime;
        break;
      case String:
        sExpires = "; expires=" + endTime;
        break;
      case Date:
        sExpires = "; expires=" + endTime.toUTCString();
        break;
    }
  }
  document.cookie = encodeURIComponent(key) + "=" + encodeURIComponent(value) + sExpires + (sDomain ? "; domain=" + sDomain : "") + (sPath ? "; path=" + sPath : "") + (bSecure ? "; secure" : "");
  return true;
}

const removeCookie = (sKey, sPath, sDomain) => {
  if (!sKey || !this.hasItem(sKey)) { return false; }
  document.cookie = encodeURIComponent(sKey) + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT" + (sDomain ? "; domain=" + sDomain : "") + (sPath ? "; path=" + sPath : "");
  return true;
}

const hasCookie = (sKey) => {
  return (new RegExp("(?:^|;\\s*)" + encodeURIComponent(sKey).replace(/[-.+*]/g, "\\$&") + "\\s*\\=")).test(document.cookie);
}

const getCookieKeys = () => {
  const aKeys = document.cookie.replace(/((?:^|\s*;)[^\=]+)(?=;|$)|^\s*|\s*(?:\=[^;]*)?(?:\1|$)/g, "").split(/\s*(?:\=[^;]*)?;\s*/);
  for (let nIdx = 0; nIdx < aKeys.length; nIdx++) { aKeys[nIdx] = decodeURIComponent(aKeys[nIdx]); }
  return aKeys;
}

export { getCookie, setCookie, removeCookie, hasCookie, getCookieKeys }
