const fs = require('fs')
const util = require('util')
const consola = require('consola')
const { Nuxt, Builder } = require('nuxt')
const schedule = require('node-schedule')
const express = require('./utils/extend')
const app = express()

try {
  fs.statSync('./logs');
} catch (error) {
  fs.mkdir('logs', { recursive: true }, (err) => {
    if (err) throw err;
  });
}

console.log = function () {
  const time = new Date().toLocaleString()
  let logPath = `logs/process-log-${new Date().toLocaleDateString()}.log`
  let logFile = fs.createWriteStream(logPath, { flags: 'a' })
  logFile.write(time + ': ' + util.format.apply(null, arguments) + '\n')
  process.stdout.write(util.format.apply(null, arguments) + '\n')
}

console.error = function () {
  const time = new Date().toLocaleString()
  let logPath = `logs/process-log-${new Date().toLocaleDateString()}.log`
  let logFile = fs.createWriteStream(logPath, { flags: 'a' })
  logFile.write(time + ': ' + util.format.apply(null, arguments) + '\n')
  process.stderr.write(util.format.apply(null, arguments) + '\n')

}

//定时删除日志文件
const scheduleCronstyle = () => {
  //每天1点执行一次:
  schedule.scheduleJob('0 0 1 * * *', () => {
    const time = new Date(Date.now() - 1000 * 3600 * 24 * 3).toLocaleDateString()
    const files = [`logs/info-${time}.log`, `logs/req-${time}.log`, `logs/error-${time}.log`, `logs/code-${time}.log`, `logs/process-log-${time}.log`]
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
/* eslint-disable-next-line */
const config = require('../nuxt.config.js')
const log = require('./middleware/log')
const route = require('./router')
config.dev = process.env.NODE_ENV !== 'production'

scheduleCronstyle()
async function start() {
  // Init Nuxt.js
  const nuxt = new Nuxt(config)

  const { host, port } = nuxt.options.server

  // Build only in dev mode
  if (config.dev || process.env.MODE === 'local') {
    const builder = new Builder(nuxt)
    await builder.build()
  } else {
    await nuxt.ready()
  }

  app.use(route)

  app.use(log)
  // Give nuxt middleware to express
  app.use(nuxt.render)

  // Listen the server
  app.listen(port, host)
  consola.ready({
    message: `Server listening on http://127.0.0.1:${port}`,
    badge: true
  })
}
start()
