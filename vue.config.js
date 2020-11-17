module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        // 配置别名
        'assets': '@/assets',
        'components': '@/components',
        'views': '@/views'
      }
    }
  },
  devServer: {
    proxy: { // 配置跨域
      '/api': {
        target: 'http://100.2.176.58:8081',
        changOrigin: true, // 允许跨域
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  },
 publicPath: './',
 lintOnSave: false,
 productionSourceMap: false
}