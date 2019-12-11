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


export {
    getStorage,
    setStorage,
    clearAllStorage,
    clearSingleStorage,
}
