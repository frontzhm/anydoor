// exec执行系统的默认命令
const {exec} = require('child_process')
module.exports = url => {
    switch(process.platform){
        // mac
        case 'darwin':
            exec(`open ${url}`)
            break
        // windows
        case 'win32':
            exec(`start ${url}`)
            break
        // linux 暂时不支持
    }
}