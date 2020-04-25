const chalk = require('chalk'),
    moment = require("moment");
const time = `[${moment().format(" HH:mm:ss | DD-MM-YYYY")}]`;
const {ArcaneError} = require('./ArcaneError');
class Logger {

    static log(content){
        console.log(`${chalk.cyan(time)} ${chalk.blue.underline(('[LOG]'))} ${content}`)
    }

    static error(content){
        console.error(`${chalk.cyan(time)} ${chalk.red.underline(('[ERROR]'))} ${content}`)
    }
    static CriticalError(content,errorCode,error){
        throw new ArcaneError(content,errorCode,error ? error:'None')
    }

}

module.exports = Logger;