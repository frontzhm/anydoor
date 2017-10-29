const path = require('path')

const mimeTypes = {
    aac: "audio/aac",
    // 如果加小图标的话
    // aac: {
    //     text: "audio/aac",
    //     icon: 小图标路径
    // },
    mid: "audio/midi",
    midi: "audio/midi",
    oga: "audio/ogg",
    weba: "audio/webm",
    txt: "text/plain",
    css: "text/css",
    csv: "text/csv",
    html: "text/html",
    ics: "text/calendar",
    avi: "video/x-msvideo",
    mpeg: "video/mpeg",
    opv: "video/ogg",
    // 3gp,3g2没有视频的就是audio/3gpp  audio/3gpp2
    "3gp": "video/3gpp",
    "3g2": "video/3gpp2",
    gif: "image/gif",
    ico: "image/x-icon",
    jpeg: "image/jpeg",
    jpg: "image/jpeg",
    svg: "image/svg+xml",
    tif: "image/tiff",
    tiff: "image/tiff",
    webp: "image/webp",
    ttf: "font/ttf",
    woff: "font/woff",
    woff2: "font/woff2",
    abw: "application/x-abiword",
    arc: "application/octet-stream",
    bin: "application/octet-stream",
    azw: "application/vnd.amazom.ebook",
    bz: "application/x-bzip",
    bz2: "application/x-bzip2",
    csh: "application/x-csh",
    doc: "application/msword",
    epub: "application/epub+zip",
    jar: "application/java-archive",
    js: "application/javascript",
    json: "application/json",
    mpkg: "application/vnd.apple.installer+xml",
    odp: "application/vnd.oasis.opendocument.presentation",
    ods: "application/vnd.oasis.opendocument.spreadsheet",
    odt: "application/vnd.oasis.opendocument.text",
    ogg: "application/ogg",
    pdf: "application/pdf",
    rtf: "application/rtf",
    xml: "application/xml",
    sh: "application/x-sh",
    ppt: "application/vnd.ms-powerpoint",
    rar: "application/x-rar-compressed",
    swf: "application/x-shockwave-flash",
    tar: "application/x-tar",
    vsd: "application/vnd.visio",
    xhtml: "application/xhtml+xml",
    xls: "application/vnd.ms-excel",
    xul: "application/vnd.mozilla.xul+xml",
    zip: "application/zip",
    "7z": "application/x-7z-compressed"
  }

  module.exports = filePath => {
    //   path.extname有个bug  jquery.min.js 其会认为后缀是 .min.js
    let ext = path.extname(filePath)
        .split('.')
        .pop()
        .toLowerCase()
    // 拓展名为空的时候
    if(!ext){
        ext = filePath
    }
    // 如果找不到相应的mime 就默认返回 text/plain 
    return mimeTypes[ext] || mimeTypes['txt']
  }