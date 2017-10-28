const http = require('http')
// 让控制台漂亮点  这个在运行的时候也需要 所以不用加dev
const chalk = require('chalk')
// 配置单独放一个文件
const conf = require('./config/defaultConf')
// 判断是不是文件
const fs = require('fs')
// 用户访问的地址变成服务器上的路径
const path = require('path')

const server = http.createServer((req, res) => {
  const filePath = path.join(conf.root, req.url)
  // 一般用stat判断文件是不是存在
  fs.stat(filePath, (err, stats) => {
    if (err) {
      res.statusCode = 404
      res.setHeader('Content-type', 'text-plain')
      res.end(`${filePath} is not a directory or file.`)
      return
    }
    if (stats.isFile()) {
      res.statusCode = 200
      res.setHeader('Content-type','text-plain')
      // 直接用流 流进res即可
      fs.createReadStream(filePath).pipe(res)
      return
    }
    if (stats.isDirectory()) {
      // files是文件名的数组
      fs.readdir(filePath, (err,files)=>{
        res.statusCode = 200
        res.setHeader('Content-type', 'text-plain')
        console.log(files)
        // 将文件名串起来
        res.end(files.join(', '))
      })
    }

  })
})

server.listen(conf.port, conf.hostname,()=>{
  const addr = `http://${conf.hostname}:${conf.port}`
  console.info(`Server started at ${chalk.green(addr)}`)
})
