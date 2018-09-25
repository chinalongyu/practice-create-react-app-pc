/**
 * @name webpack.common.js
 * 
 * @description
 * 开发环境(development)和生产环境(production)公用的 entry 和 output配置，
 * 以及这两个环境公用的全部插件。
 * 
 * @author fandand at 2018-09-10
 */

const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const debug = require('debug')('app:config:webpack:common')
const project = require('./project.config')

debug('Creating webpack common configuration.')

const APP_ENTRY = project.paths.client('index.jsx')

const config = {
    // =================================================
    // 入口
    // =================================================
    entry: {
        app: APP_ENTRY
        // app: './src/index.jsx'
    },

    // =================================================
    // resolve 配置 webpack 如何寻找模块对应的文件。
    // 如果不配置，将找不到 src 下的文件
    // =================================================
    resolve: {
        modules: [
            project.paths.client(),
            'node_modules'
        ],
        extensions: ['.js', '.jsx', '.json']
    },

    // =================================================
    // 输出
    // =================================================
    output: {
        filename: '[name].bundle.js',
        path: project.paths.dist(),
        publicPath: project.compiler_public_path
    },

    // =================================================
    // 插件
    // =================================================
    plugins: [
        new HtmlWebpackPlugin({
            title: '练习创建react项目脚手架，pc端'
        })
    ],

    // =================================================
    // 加载资源
    // =================================================
    module: {
        rules: [{
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
            options: project.compiler_babel
        }, {
            test: /\.scss$/,
            use: [
                'style-loader',
                'css-loader?sourceMap&-minimize&modules',
                'postcss-loader',
                'sass-loader?sourceMap&modules'
            ]
        }, {
            test: /\.css$/,
            use: [
                'style-loader',
                'css-loader?sourceMap&-minimize&modules',
                'postcss-loader'
            ]
        }, {
            test: /\.woff(\?.*)?$/,
            loader: 'url-loader?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=application/font-woff'
        }, {
            test: /\.woff2(\?.*)?$/,
            loader: 'url-loader?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=application/font-woff2'
        }, {
            test: /\.otf(\?.*)?$/,
            loader: 'file-loader?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=font/opentype'
        }, {
            test: /\.ttf(\?.*)?$/,
            loader: 'url-loader?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=application/octet-stream'
        }, {
            test: /\.eot(\?.*)?$/,
            loader: 'file-loader?prefix=fonts/&name=[path][name].[ext]'
        }, {
            test: /\.svg(\?.*)?$/,
            loader: 'url-loader?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=image/svg+xml'
        }, {
            test: /\.(png|jpg|gif)$/,
            loader: 'url-loader?limit=8192'
        }, {
            test: /\.(swf)$/,
            loader: 'file-loader'
        }]
    }
}

module.exports = config