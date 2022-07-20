const { defineConfig } = require('@vue/cli-service')
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const productionGzipExtensions = ['js', 'css']
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave:false,
  publicPath: '/mingtest/',
})

configureWebpack: config => {
  config.name = name
  config.resolve.alias['@'] = resolve('src')
  config.performance = {
    hints: 'warning',
    //入口起点的最大体积 整数类型（以字节为单位）
    maxEntrypointSize: 50000000,
    //生成文件的最大体积 整数类型（以字节为单位 300k）
    maxAssetSize: 30000000,
    //只给出 js 文件的性能提示
    assetFilter: function(assetFilename) {
      return assetFilename.endsWith('.js')
    }
  }
  if (process.env.NODE_ENV !== 'development') {
    // 生产环境
    // 编译时删除console.log
    config.optimization.minimizer[0].options.terserOptions.compress.drop_console = true
    //  配置productionGzip-高级的方式
    // 配置参数详解
    // asset： 目标资源名称。 [file] 会被替换成原始资源。[path] 会被替换成原始资源的路径， [query] 会被替换成查询字符串。默认值是 "[path].gz[query]"。
    // algorithm： 可以是 function(buf, callback) 或者字符串。对于字符串来说依照 zlib 的算法(或者 zopfli 的算法)。默认值是 "gzip"。
    // test： 所有匹配该正则的资源都会被处理。默认值是全部资源。
    // threshold： 只有大小大于该值的资源会被处理。单位是 bytes。默认值是 0。
    // minRatio： 只有压缩率小于这个值的资源才会被处理。默认值是 0.8。
    config.plugins.push(
      new CompressionWebpackPlugin({
        filename: '[path].gz[query]',
        algorithm: 'gzip',
        test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
        threshold: 5000,
        minRatio: 0.5
      })
    )
  } else {
    // 开发环境
  }
}

