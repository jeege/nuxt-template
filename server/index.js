const fs = require('fs')
const util = require('util')
const express = require('express')
const consola = require('consola')
const bodyParser = require('body-parser')
const { Nuxt, Builder } = require('nuxt')
const schedule = require('node-schedule')
const app = express()
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));

const jsonParser = bodyParser.json();

let logPath = 'logs/process-log.log'
let logFile = fs.createWriteStream(logPath, { flags: 'a' })

console.log = function () {
  const time = new Date().toLocaleString()
  logFile.write(time + ': ' + util.format.apply(null, arguments) + '\n')
  process.stdout.write(util.format.apply(null, arguments) + '\n')
}

console.error = function () {
  const time = new Date().toLocaleString()
  logFile.write(time + ': ' + util.format.apply(null, arguments) + '\n')
  process.stderr.write(util.format.apply(null, arguments) + '\n')
}

//定时删除日志文件
const scheduleCronstyle = () => {
  //每天1点执行一次:
  schedule.scheduleJob('0 0 1 * * *', () => {
    const time = new Date(Date.now() - 1000 * 3600 * 24 * 30).toLocaleDateString()
    const files = [`logs/info-${time}.log`, `logs/req-${time}.log`, `logs/error-${time}.log`, `logs/code-${time}.log`]
    files.map(i => {
      fs.access(i, fs.constants.F_OK, (err) => {
        if (!err) {
          fs.unlink(i, (err) => {
            if (err) throw err;
            console.log('文件已删除');
          });
        } else {
          console.log('文件不存在')
        }
      });
    })
  });
}


// Import and Set Nuxt.js options
const config = require('../nuxt.config.js')
const logger = require('./utils/log')
const log = require('./middleware/log')
config.dev = process.env.NODE_ENV !== 'production'

scheduleCronstyle()
async function start() {
  // Init Nuxt.js
  const nuxt = new Nuxt(config)

  const { host, port } = nuxt.options.server

  // Build only in dev mode
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  } else {
    await nuxt.ready()
  }

  app.post('/log', jsonParser, function (req, res, next) {
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

  app.use(log)

  // Give nuxt middleware to express
  app.use(nuxt.render)

  // Listen the server
  app.listen(port, host)
  consola.ready({
    message: `Server listening on http://localhost:${port}`,
    badge: true
  })
}
start()
