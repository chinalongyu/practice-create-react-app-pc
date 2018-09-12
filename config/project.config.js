/**
 * @name project.config.js
 * 
 * @description 项目文件结构路径
 * 
 * @author fandand at 2018-09-10
 */

const path = require('path')
const debug = require('debug')('app:config:project')
const ip = require('ip')

debug('Creating default path configuration')

const config = {
    env: process.env.NODE_ENV || 'development',
    host_url: process.env.HOST_URL,

    // =================================================
    // 项目目录结构
    // =================================================
    path_base: path.resolve(__dirname, '..'),
    dir_client: 'src',
    dir_dist: 'dist',
    dir_public: 'public',

    // =================================================
    // 启动服务的配置
    // =================================================
    server_host: ip.address(),
    server_port: process.env.PORT || 4100,

    // =================================================
    // 编译配置
    // =================================================
    compiler_babel: {
        cacheDirectory: true,
        plugins: ['transform-runtime'],
        // presets: ['es2015', 'react', 'stage-0']
        presets: ['@babel/env']
    },
    compiler_devtool: 'source-map',
    compiler_hash_type: 'hash',
    compiler_fail_on_warning: false,
    compiler_quiet: false,
    compiler_public_path: './',
    compiler_stats: {
        chunks: false,
        chunkModules: false,
        colors: true
    },
    compiler_vendors: [
        'react',
        'react-dom',
        'react-redux',
        'react-router',
        'redux'
    ],
}

// =================================================
// 全局配置
// =================================================
config.globals = {
    'process.env': {
        'NODE_ENV': JSON.stringify(config.env)
    },
    'NODE_ENV': config.env,
    '__URL__': JSON.stringify(config.host_url),
    '__DEV__': config.env === 'development',
    '__PROD__': config.env === 'production'
}

// =================================================
// 依赖验证
// =================================================
const pkg = require('../package.json')

config.compiler_vendors = config.compiler_vendors
    .filter((dep) => {
        if (pkg.dependencies[dep]) return true

        debug(
            `Package "${dep}" was not found as an npm dependency in package.json; ` +
            `it won't be included in the webpack vendor bundle.
            Consider removing it from \`compiler_vendors\` in ~/config/index.js`
        )
    })

// =================================================
// Utilities
// =================================================
function base() {
    const args = [config.path_base].concat([].slice.call(arguments))
    return path.resolve.apply(path, args)
}

config.paths = {
    base: base,
    client: base.bind(null, config.dir_client),
    public: base.bind(null, config.dir_public),
    dist: base.bind(null, config.dir_dist)
}

// =================================================
// Environment Configuration
// =================================================
debug(`Looking for environment overrides for NODE_ENV "${config.env}".`)

const environments = require('./env.config')
const overrides = environments[config.env]
if (overrides) {
    debug('Found overrides, applying to default configuration.')
    Object.assign(config, overrides(config))
} else {
    debug('No environment overrides found, defaults will be used.')
}

module.exports = config