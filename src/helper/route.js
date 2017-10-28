// 判断是不是文件
const fs = require('fs')

// 解决回调地狱
const promisify = require('util').promisify
// 将异步变成promise
const readdir = promisify(fs.readdir)
const stat = promisify(fs.stat)
// await 只能在async函数里面使用
module.exports = async function (res, req, filePath) {
// 一般用stat判断文件是不是存在
// 解决回调地狱
// aync包装try catch
   
  try{
    const stats = await stat(filePath)
    if (stats.isFile()) {
      res.statusCode = 200
      res.setHeader('Content-type','text-plain')
      // 直接用流 流进res即可
      fs.createReadStream(filePath).pipe(res)
      return
    }
    if (stats.isDirectory()) {
        const files = await readdir(filePath)
        res.statusCode = 200
        res.setHeader('Content-type', 'text-plain')
        console.log(files)
        // 将文件名串起来
        res.end(files.join(', '))
      // files是文件名的数组
    /*   fs.readdir(filePath, (err,files)=>{
        res.statusCode = 200
        res.setHeader('Content-type', 'text-plain')
        console.log(files)
        // 将文件名串起来
        res.end(files.join(', '))
      }) */
    }
  }catch(ex){
    res.statusCode = 404
    res.setHeader('Content-type', 'text-plain')
    res.end(`${filePath} is not a directory or file.`)
  }
}