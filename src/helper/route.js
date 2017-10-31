// 模板引擎
const Handlebars = require('handlebars')
// 文件中尽可能避开相对路径,因为不同系统的路径分隔符不同,所以使用绝对路径
const path = require('path')
// 需要知道root
const config = require('../config/defaultConf')
// 判断是不是文件
const fs = require('fs')

// 解决回调地狱
const promisify = require('util').promisify
// 将异步变成promise
const readdir = promisify(fs.readdir)
const stat = promisify(fs.stat)
// 文件中尽可能避开相对路径,因为不同系统的路径分隔符不同,所以使用绝对路径
const tplPath = path.join(__dirname,'../template/dir.tpl')
// const source = fs.readFileSync('../template/dir.tpl')
// 这里用同步是因为 必须等待这个结果 只执行一次
const source = fs.readFileSync(tplPath)
// 使用模板编译 这边默认读出来的是buffer
const template = Handlebars.compile(source.toString())
// 得到正确的mime类型
const mime = require('./mime')
// 压缩文件
const compress = require('./compress')
// 请求文件的范围 
const range = require('./range')
// 缓存
const isFresh = require('./cache')
// await 只能在async函数里面使用
module.exports = async function (req, res, filePath) {
// 一般用stat判断文件是不是存在
// 解决回调地狱
// aync包装try catch
   
  try{
    const stats = await stat(filePath)
    if (stats.isFile()) {
      const contentType = mime(filePath)
      res.setHeader('Content-type',contentType)
      // 先判断可不可以用缓存 可以的话直接用缓存 且304
      console.log(isFresh(stats, req, res))
      if(isFresh(stats, req, res)){
        res.statusCode = 304
        res.end()
        return
      }
      let rs
      const {code, start, end} = range(stats.size, req, res)
      // 直接用流 流进res即可
      if (code === 200 ) {
        res.statusCode = 200
        // fs.createReadStream(filePath).pipe(res)
        rs = fs.createReadStream(filePath)
      }else{
        res.statusCode = 206
        // 也就是部分内容
        rs = fs.createReadStream(filePath, {start,end})
      }
      // fs.createReadStream(filePath).pipe(res)
      // let rs = fs.createReadStream(filePath)
      if(filePath.match(config.compress)){
        rs = compress(rs, req, res)
      }
      rs.pipe(res)
      return
    }
    if (stats.isDirectory()) {
        const files = await readdir(filePath)
        res.statusCode = 200
        res.setHeader('Content-type', 'text/html')
        const dir = path.relative(config.root,filePath)
        const data = {
          title: path.basename(filePath),
          // dir始终要相对于根目录  path.relative如果本身就是根目录那么返回为空字符串
          dir: dir ? `/${dir}` : '',
          files: files.map(file => {
            return {
              file,
              // 得到相应的文件小图片
              icon: mime(file)
            }
          })
        }
        // console.log(files)
        // 将文件名串起来
        res.end(template(data))
        // path = url.path + '/' + file



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
    // 开发环境可以打印错误信息 但是线上是不可以显示的  所以这里一般需要判断
    res.end(`${filePath} is not a directory or file.\n ${ex.toString()}`)
  }
}