const webpack = require('webpack')
const path = require('path')
const Dotenv = require('dotenv-webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

// NOTE: We have to pull this in here because we configure Webpack's dev server
// based on this config.
require('dotenv').config()

module.exports = {
  devtool: 'inline-source-map',
  entry: [
    'react-hot-loader/patch',
    `webpack-dev-server/client?http://localhost:3001`,
    'webpack/hot/only-dev-server',
    './src/client/index',
    './src/app/styles/application.scss'
  ],
  target: 'web',
  module: {
    rules: [
      {
        test: /\.js?$/,
        use: 'babel-loader',
        include: [
          path.join(__dirname, 'src', 'client'),
          path.join(__dirname, 'src', 'app')
        ]
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader', 
          use: ['css-loader', 'sass-loader']
        })
      },
      {
        test: /\.(jpe?g|gif|png|svg|woff|ttf|wav|mp3)$/,
        loader: "file"
      }
    ]
  },
  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new Dotenv(),
    new webpack.DefinePlugin({
      "process.env": {
        "BUILD_TARGET": JSON.stringify("client"),
      }
    }),
    new ExtractTextPlugin({ filename: '[name].css', disable: false, allChunks: true }),
    new CopyWebpackPlugin([
      { from: './src/app/static' },
    ])
  ],
  devServer: {
    host: process.env.WEBPACK_HOST,
    port: 3001,
    historyApiFallback: true,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
      "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
    },
    hot: true
  },
  output: {
    path: path.join(__dirname, 'build'),
    publicPath: `http://localhost:3001/`,
    filename: 'client.js'
  }
}
