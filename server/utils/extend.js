const express = require('express')

express.response.success = function (data) {
  express.response.json.call(this, {
    code: '1000',
    data,
    message: '接口调用成功'
  })
}

express.response.error = function (code, message) {
  express.response.json.call(this, {
    code,
    message
  })
}

module.exports = express