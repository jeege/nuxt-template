const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')
const jsonParser = bodyParser.json();
const logger = require('../utils/log')
 
router.post('/log', jsonParser, function (req, res, next) {
  let type = req.body.type
  if (type == '代码错误') {
    logger.code(JSON.stringify(req.body))
  }
  if (type == '失败请求') {
    logger.error(JSON.stringify(req.body))
  }
  if (type == '成功请求') {
    logger.req(JSON.stringify(req.body))
  }
  res.sendStatus(200)
})

module.exports = router