const getCookie = (key, doc = document) => {
  return decodeURIComponent(doc.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*" + encodeURIComponent(key).replace(/[-.+*]/g, "\\$&") + "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1")) || null;
}

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
