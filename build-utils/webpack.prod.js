const commonPaths = require('./common-paths')
const webpack = require('webpack')
const CompressionPlugin = require("compression-webpack-plugin")

const config = {
  mode: 'production',
  entry: {
    app: [
      'babel-polyfill',
      `${commonPaths.appEntry}/index.js`
    ]
  },
  output: {
    filename: 'static/[name].js'
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader",
            options: { minimize: true }
          }
        ]
      }  
    ]
  },
  plugins: [
    new CompressionPlugin({
      asset: "[path].gz[query]",
      algorithm: "gzip",
      test: /\.js$|\.css$|\.html$/,
      threshold: 0,
      minRatio: 0.8
    })
  ]
}

module.exports = config
