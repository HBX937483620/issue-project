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
    proxy: { // 配置跨域 代理实现跨域
      '/api': {
        // http://100.2.176.58:8081 金全
        // http://100.2.163.111:8081 健超
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