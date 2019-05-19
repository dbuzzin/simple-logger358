const fs    = require("fs"),
      path  = require("path");

let date    = new Date(),
    month   = date.getMonth() < 10 ? `0${date.getMonth()}` : date.getMonth(),
    day     = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate(),
    hours   = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours(),
    mins    = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes(),
    secs    = date.getSeconds() < 10 ? `0${date.getSeconds()}` : date.getSeconds(),

    time        = `${hours}:${mins}:${secs}`,
    dateStamp   = `${day}-${month}-${date.getFullYear()}`;

function checkDir(logPath) {
    fs.exists(logPath, exists => {
        if(!exists) {
            fs.mkdir(logPath, {} , err => {
                if(err) throw err;
            });
        }
    });
}

function writeTo(file, logPath, log) {

    fs.exists(path.join(logPath, file), exists => {
        if(!exists) {
            fs.writeFile(path.join(logPath, file), `[${time}]: ${log}\r\n`, err => {
                if (err) throw err;
            });
        } else {
            fs.appendFile(path.join(logPath, file), `[${time}]: ${log}\r\n`, err => {
                if (err) throw err;
            });
        }
    });
}

module.exports = function logger(log) {

    let logPath = "./logs";

    checkDir(logPath);
    writeTo(`log_${dateStamp}.txt`, logPath, log);

}


