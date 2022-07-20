const { defineConfig } = require('@vue/cli-service')
const CompressionPlugin  = require('compression-webpack-plugin')

module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave:false,
  publicPath: '/mingtest/',
  chainWebpack: (config) => {
    // 生产环境，开启js\css压缩
    if (process.env.NODE_ENV === 'production') {
      config.plugin('compressionPlugin').use(new CompressionPlugin({
        test: /\.(js|css|less|map|png|jpg)$/, // 匹配文件名
        threshold: 1024, // 对超过10k的数据压缩
        minRatio: 0.5,
      }))
    }
 
  },
})



