const mbox = require('./dist');

mbox.parseMbox(process.stdin).catch(e => console.log(e)).finally(_ => console.log('done'));