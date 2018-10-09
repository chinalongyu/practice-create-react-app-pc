/**
 * @name webpack.dev.js
 * 
 * @description 开发环境(development)的构建配置
 
 * @author fandand at 2018-09-10
 */

const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const common = require('./webpack.common.js')
const project = require('./project.config')

const LOG = (log) => {
    console.log('[## app:config:webpack:dev] ', log)
}

LOG('Creating webpack configuration.')

LOG(project.paths.dist)

const config = merge(common, {
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        contentBase: project.paths.dist(),
        compress: true,
        // 默认是 localhost， 如果想通过ip也可以访问，需要设置 host 的值
        // host: project.server_host,
        host: '0.0.0.0',
        port: project.server_port
    },
    plugins: [
        // 模块热替换插件
        new webpack.HotModuleReplacementPlugin(),
        // 用来跳过编译时出错的代码并记录，使编译后运行时的包不会发生错误
        new webpack.NoEmitOnErrorsPlugin()
    ]
})

module.exports = config