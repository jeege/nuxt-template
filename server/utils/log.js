const path = require('path')
const log4js = require('log4js');
const time = new Date().toLocaleDateString()
// 定义log config
log4js.configure({
    appenders: { 
        // 定义两个输出源
        info: { type: 'file', filename: path.resolve(`logs/info-${time}.log`) },
        req: { type: 'file', filename: path.resolve(`logs/req-${time}.log`) },
        code: { type: 'file', filename: path.resolve(`logs/code-${time}.log`) },
        error: { type: 'file', filename: path.resolve(`logs/error-${time}.log`) }
    },
    replaceConsole: true,
    categories: { 
        // 为info/warn/debug 类型log调用info输出源   error/fatal 调用error输出源
        default: { appenders: ['info'], level: 'info' },
        info: { appenders: ['info'], level: 'info' },
        req: { appenders: ['req'], level: 'info' },
        code: { appenders: ['code'], level: 'info' },
        warn: { appenders: ['info'], level: 'warn' },
        debug: { appenders: ['info'], level: 'debug' },
        error: { appenders: ['error'], level: 'error' },
        fatal: { appenders: ['error'], level: 'fatal' },
    }
});
// 导出5种类型的 logger
module.exports = {
    debug: (...params) => log4js.getLogger('debug').debug(...params),
    info: (...params) => log4js.getLogger('info').info(...params),
    req: (...params) => log4js.getLogger('req').info(...params),
    code: (...params) => log4js.getLogger('code').info(...params),
    warn: (...params) => log4js.getLogger('warn').warn(...params),
    error: (...params) => log4js.getLogger('error').error(...params),
    fatal: (...params) => log4js.getLogger('fatal').fatal(...params),
}