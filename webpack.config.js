const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const CONFIG = require('./app.config')

module.exports = {
  entry: './src/index.js',
  output: {
    filename:
      process.env.NODE_ENV !== 'production' ? '[name].js' : '[name].[hash].js',
    path: path.resolve(__dirname, 'build')
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'build'),
    https: true,
    host: 'start.stage.zesty.io'
  },
  devtool: 'cheap-module-source-map',
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
  plugins: [
    new CleanWebpackPlugin({
      cleanStaleWebpackAssets: false
    }),
    new MiniCssExtractPlugin({
      filename:
        process.env.NODE_ENV !== 'production'
          ? '[name].css'
          : '[name].[hash].css'
    }),
    new CopyPlugin({
      patterns: ['public']
    }),
    new HtmlWebpackPlugin({
      template: 'src/index.html'
    }),
    new webpack.DefinePlugin({
      __CONFIG__: JSON.stringify(CONFIG)
    })
  ],
  module: {
    rules: [
      {
        test: /\.less$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: process.env.NODE_ENV !== 'production'
            }
          },
          {
            loader: 'css-loader',
            options: {
              modules: true,
              localIdentName: '[local]--[hash:base64:5]'
            }
          },
          {
            loader: 'less-loader'
          }
        ]
      },
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader',
        query: {
          presets: ['@babel/preset-env', '@babel/preset-react']
        }
      }
    ]
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all'
        }
      }
    }
  }
}
