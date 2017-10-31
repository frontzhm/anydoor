const {cache} = require('../config/defaultConf')
function refreshRes(stats, res) {
    const {maxAge,expires,cacheControl,lastModified,etag} = cache
    if (expires) {
        // Date.now()是毫秒 maxAge是秒 ,转成时间字符串
        res.setHeader('Expires',(new Date(Date.now() + maxAge * 1000)).toUTCString())
    }
    if(cacheControl) {
        // toUTCString() 方法可根据世界时 (UTC) 把 Date 对象转换为字符串，并返回结果。
        res.setHeader('Cache-Control',`public, max-age=${maxAge}`)
    }
    if(lastModified) {
        res.setHeader('Last-Modified',`${stats.mtime.toUTCString()}`)
    }
    if(etag) {
        // mtime 需要转成字符串，否则在 windows 环境下会报错
        // 但是这个etag中有逗号  req.headers['if-modified-since']只是获取到etag中逗号之前的部分
        // res.setHeader('ETag', `${stats.size}-${stats.mtime.toUTCString()}`); 
        res.setHeader('ETag', `${stats.size}-1`); 
    }
}
module.exports = function isFresh(stats, req, res){
    refreshRes(stats, res)
    const lastModified = req.headers['if-modified-since']
    const etag = req.headers['if-none-match']
    if(!lastModified && !etag) {
        console.log(1)
        return false
    }
    if(lastModified && lastModified !== res.getHeader('Last-Modified')) {
        console.log(2)
        return false
    }
    if(etag && etag !== res.getHeader('ETag')){
        console.log(3)
        return false
    }
    return true
}