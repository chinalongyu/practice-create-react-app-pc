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
    // Entry Points
    // =================================================
    entry: {
        app: APP_ENTRY
    },

    // =================================================
    // Output Points
    // =================================================
    output: {
        filename: '[name].bundle.js',
        path: project.paths.dist(),
        publicPath: project.compiler_public_path
    },
}

// =================================================
// Plugins
// =================================================
config.plugins = [
    new webpack.DefinePlugin(project.globals),
    new webpack.LoaderOptionsPlugin({
        options: {
            context: __dirname,
            postcss: function () {
                return cssnano({
                    autoprefixer: {
                        add: true,
                        remove: false
                    },
                    discardComments: {
                        removeAll: true
                    },
                    discardUnused: false,
                    mergeIdents: false,
                    reduceIdents: false,
                    safe: true,
                    sourcemap: true
                })
            },
            sassLoader: { includePaths: project.paths.client('styles') }
        }
    }),
    new HtmlWebpackPlugin({
        template: project.paths.public('index.html'),
        hash: false,
        filename: 'index.html',
        inject: 'body',
        minify: {
            collapseWhitespace: true
        }
    }),
    // 优化公共模块，不然每个chunk都会包含公共模块，文件非常大。
    new webpack.optimize.CommonsChunkPlugin({
        names: ['vendor'],
        // async: true,  // 设置了会生成新的chunk
        children: true,
        minChunks: 2
    })
]


// =================================================
// Loaders
// Include JavaScript loaders, Style loaders, File loaders
// =================================================
config.module.rules = [{
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

module.exports = config