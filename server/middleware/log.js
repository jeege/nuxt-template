const log = require('../utils/log')
module.exports = function (req, res, next) {
  let client = {
    ip: req.headers['x-forwarded-for'] ||
      req.connection.remoteAddress ||
      req.socket.remoteAddress ||
      req.connection.socket.remoteAddress,
    method: req.method,
    url: req.url,
    referer: req.headers.referer,
    userAgent: req.headers['user-agent'],
  }
  log.info(JSON.stringify(client))
  next();
}