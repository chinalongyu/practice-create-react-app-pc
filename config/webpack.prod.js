/**
 * @name webpack.prod.js
 * 
 * @description 生产环境(production)的构建配置
 * 
 * @author fandand at 2018-09-10
 */

const webpack = require('webpack')
const merge = require('webpack-merge')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const debug = require('debug')('app:config:webpack:prod')
const common = require('./webpack.common.js')

debug('Creating webpack prod configuration.')

const config = merge(common, {
    plugins: [
        // 压缩js代码
        new UglifyJsPlugin({
            compress: {
                unused: true,
                dead_code: true,
                warnings: false
            }
        }),
        new ExtractTextPlugin({
            filename: '[name].[contenthash].css',
            allChunks: true
        })
    ]
})

config.module.rules.filter((loader) =>
    loader.use && loader.use.find((name) => /css/.test(name.split('?')[0]))
).forEach((loader) => {
    const first = loader.use[0]
    const rest = loader.use.slice(1)
    loader.loader = ExtractTextPlugin.extract({
        fallbackLoader: first,
        loader: rest.join('!')
    })
    delete loader.use
})

module.exports = config