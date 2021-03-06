module.exports = {
  // process.cwd()是执行命令的路径
  // 也就是我可能在上一层文件夹执行命令,也可能在上上层文件夹执行命令
  root: process.cwd(),
  hostname: '127.0.0.1',
  port: 9527,
  // 需要压缩的格式
  compress: /\.(html|js|css|md)/,
  // 缓存配置
  cache: {
    // 单位是s
    maxAge: 6000000,
    expires: true,
    cacheControl: true,
    lastModified: true,
    etag: true
  }
}
