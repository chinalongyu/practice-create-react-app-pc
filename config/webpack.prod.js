/**
 * @name webpack.prod.js
 * 
 * @description 生产环境(production)的构建配置
 * 
 * @author fandand at 2018-09-10
 */

const webpack = require('webpack')
const merge = require('webpack-merge')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const common = require('./webpack.common.js')

const LOG = (log) => {
    console.log('[## app:config:webpack:prod] ', log)
}

LOG('Creating webpack configuration.')

const config = merge(common, {
    // 指定环境
    mode: 'production',
    devtool: 'source-map',
    optimization: {},
    plugins: [
        new CleanWebpackPlugin(['dist']),
        // 分离 css 文件
        new MiniCssExtractPlugin({
            filename: 'css/[name].css',
            chunkfilename: '[id].css'
        }),
    ],
    module: {
        rules: [{
            test: /\.scss$/,
            use: [
                MiniCssExtractPlugin.loader,
                'css-loader?sourceMap&-minimize&modules',
                'postcss-loader',
                'sass-loader?sourceMap&modules'
            ]
        }, {
            test: /\.css$/,
            use: [
                MiniCssExtractPlugin.loader,
                'css-loader?sourceMap&-minimize&modules',
                'postcss-loader'
            ]
        }]
    }
})

module.exports = config