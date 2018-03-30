const commonPaths = require('./common-paths')
const webpack = require('webpack')

const config = {
  mode: 'production',
  entry: {
    app: `${commonPaths.appEntry}/index.js`
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
  }
}

module.exports = config