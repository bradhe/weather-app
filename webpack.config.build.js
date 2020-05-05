const webpack = require('webpack')
const path = require('path')
const Dotenv = require('dotenv-webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

// NOTE: We have to pull this in here because we configure Webpack's dev server
// based on this config.
require('dotenv').config()

module.exports = {
  entry: [
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
      }
    ]
  },
  plugins: [
    new webpack.NamedModulesPlugin(),
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
  output: {
    path: path.join(__dirname, 'assets'),
    filename: 'client.js'
  }
}
