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
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const project = require('./project.config')

const LOG = (log) => {
    console.log('[## app:config:webpack:common] ', log)
}

LOG('Creating webpack configuration.')

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
    // 解析
    // resolve 配置 webpack 如何寻找模块对应的文件。
    // 如果不配置，将找不到 src 下的文件
    // =================================================
    resolve: {
        modules: [
            project.paths.client(),
            'node_modules'
        ],
        extensions: ['.js', '.jsx', '.json'],
        alias: {
            appConstants: path.resolve(__dirname, `${project.paths.client()}/constants`)
        }
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
            // use: [{
            //     loader: 'babel-loader',
            //     options: project.compiler_babel
            // }, {
            //     loader: 'eslint-loader',
            //     options: { // 这里的配置项参数将会被传递到 eslint 的 CLIEngine 
            //         // formatter: require('eslint-friendly-formatter') // 指定错误报告的格式规范
            //     }
            // }]
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