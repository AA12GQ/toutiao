const path = require('path')

// 自定义主题的文件路径
const coverPath = path.join(__dirname, './src/styles/cover.less')

module.exports = {
  publicPath: './',
  devServer: {
    proxy: {
      '/api': {
        target: 'http://42.192.3.136:3000/api/v1', // 接口域名
        changeOrigin: true, // 是否跨域
        ws: true, // 是否代理 websockets
        secure: false, // 是否https接口
        pathResolver: { '^/api': '' }
      },
      '': {
        target: 'http://toutiao.itheima.net',
        changeOrigin: true // 是否跨域
      }
    }
  },
  css: {
    loaderOptions: {
      less: {
        modifyVars: {
          // 通过 less 文件覆盖（文件路径为绝对路径）
          hack: `true; @import "${coverPath}";`
        }
      }
    }
  }
}
