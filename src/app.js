const http = require('http')
// 让控制台漂亮点  这个在运行的时候也需要 所以不用加dev
const chalk = require('chalk')
// 配置单独放一个文件
const conf = require('./config/defaultConf')
// 用户访问的地址变成服务器上的路径
const path = require('path')

const server = http.createServer((req, res) => {
  const filePath = path.join(conf.root, req.url)
  res.statusCode = 200
  res.setHeader('Content-Type','text-plain')
  res.end(filePath)
})

server.listen(conf.port, conf.hostname,()=>{
  const addr = `http://${conf.hostname}:${conf.port}`
  console.info(`Server started at ${chalk.green(addr)}`)
})
