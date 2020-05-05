const webpack = require('webpack')
const path = require('path')
const nodeExternals = require('webpack-node-externals')
const StartServerPlugin = require('start-server-webpack-plugin')
const Dotenv = require('dotenv-webpack');

// NOTE: We have to pull this in here because we configure Webpack's dev server
// based on this config.
require('dotenv').config()

module.exports = {
    entry: [
      '@babel/polyfill',
      'webpack/hot/poll?1000',
      './src/server/index'
    ],
    watch: true,
    target: 'node',
    externals: [nodeExternals({
        whitelist: ['webpack/hot/poll?1000']
    })],
    module: {
        rules: [{
            test: /\.jsx?$/,
            use: 'babel-loader',
            exclude: /node_modules/
        }]
    },
    plugins: [
        new StartServerPlugin('server.js'),
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new Dotenv(),
        new webpack.DefinePlugin({
            "process.env": {
                "BUILD_TARGET": JSON.stringify('server'),
            }
        }),
    ],
    output: {
        path: path.join(__dirname, 'build'),
        filename: 'server.js'
    }
}
