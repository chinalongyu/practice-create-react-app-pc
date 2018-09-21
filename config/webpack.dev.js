/**
 * @name webpack.dev.js
 * 
 * @description 开发环境(development)的构建配置
 
 * @author fandand at 2018-09-10
 */

const webpack = require('webpack')
const merge = require('webpack-merge')
const debug = require('debug')('app:config:webpack:dev')
const common = require('./webpack.common.js')
const project = require('./project.config')

debug('Creating webpack dev configuration.')

const config = merge(common, {
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        contentBase: project.paths.dist,
        compress: true,
        port: 9000
    },
    plugins: [
        // 模块热替换插件
        new webpack.HotModuleReplacementPlugin(),
        // 用来跳过编译时出错的代码并记录，使编译后运行时的包不会发生错误
        new webpack.NoEmitOnErrorsPlugin()
    ]
})

module.exports = config