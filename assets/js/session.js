// 缓存相关操作

// 1: 获取
const getStorage = function(key){
    let value = window.localStorage.getItem(key);
    return JSON.parse(value)
}

// 2: 存储
const setStorage = function(key,value){
    window.localStorage.setItem(key, JSON.stringify(value));
}

// 3: 清除
const clearAllStorage  = function(value){
    window.localStorage.clear();
}
// 4: 清除Single
const clearSingleStorage  = function(value){
    window.localStorage.removeItem(value);
}
// 5: 清除
const clearAllCookie = function() { 
    let keys=document.cookie.match(/[^ =;]+(?=\=)/g); 
    if (keys) { 
        for (let i = keys.length; i--;) 
        document.cookie=keys[i]+'=0;expires=' + new Date( 0).toUTCString() 
    } 
}

export {
    getStorage,
    setStorage,
    clearAllStorage,
    clearSingleStorage,
    clearAllCookie
}
