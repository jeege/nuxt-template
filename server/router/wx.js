const express = require('express')
const bodyParser = require('body-parser')
const router = express.Router()
const jsonParser = bodyParser.json();

router.post('/wechat/getOpenIdByCode', jsonParser, function (req, res) {
  const { code } = req.body
  if (code) {
    res.success({
      openid: '123'
    })
  } else {
    res.error('1001', '缺少code参数')
  }
})

module.exports = router