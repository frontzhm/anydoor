const yargs = require('yargs')
const Server = require('./app')
const argv = yargs
    .usage('anywhere [option]')
    .option('p',{
        // 也就是命令行的-p相当于-port
        alias: 'port',
        description: '端口号',
        default: 9527
    })
    .option('h',{
        alias: 'hostname',
        description: 'host',
        default: '127.0.0.1'
    })
    .option('d',{
        alias: 'root',
        description: 'root path',
        default: process.cwd()
    })
    .version()
    .alias('v','version')
    .help()
    .argv
    console.log(argv)
    const server = new Server(argv)
    server.start()