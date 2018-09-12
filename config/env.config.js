/**
 * @name env.config.js
 * 
 * @description 环境配置
 * 
 * @author fandand at 2018-09-10
 */

const config = {
    // =================================================
    // Overrides when NODE_ENV === 'development'
    // =================================================
    development: (config) => ({
        compiler_public_path: `http://${config.server_host}:${config.server_port}/`
    }),

    // =================================================
    // Overrides when NODE_ENV === 'production'
    // =================================================
    production: (config) => ({
        compiler_public_path: './',
        compiler_fail_on_warning: false,
        compiler_hash_type: 'chunkhash',
        compiler_devtool: null,
        compiler_stats: {
            chunks: true,
            chunkModules: true,
            colors: true
        }
    })
}

module.exports = config