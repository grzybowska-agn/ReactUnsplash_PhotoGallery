const commonPaths = require('./common-paths')
const webpack = require('webpack')

const port = process.env.PORT || 3000

const config = {
  mode: 'development',
  entry: {
    app: [
      'babel-polyfill',
      'react-hot-loader/patch', 
      `${commonPaths.appEntry}/index.js`
    ]
  },
  output: {
    filename: '[name].js'
  },
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader',
            options: {
              modules: true,
              camelCase: true,
              sourceMap: true
            }
          }
        ]
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              config: {
                ctx: {
                  autoprefixer: {
                    browsers: 'last 2 versions'
                  }
                }
              },
              sourceMap: true
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            },
          }
        ]
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  devServer: {
    host: 'localhost',
    port: port,
    historyApiFallback: true,
    hot: true,
    open: true
  }
}

module.exports = config