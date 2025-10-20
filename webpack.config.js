const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const mkdirp = require('mkdirp')

const release = require('./etc/release')
const CONFIG = require('./app.config')
const { options } = require('less')

module.exports = async (env) => {
  // create build/ dir
  mkdirp.sync(path.resolve(__dirname, './build/'))
  // Attach release info onto config to connect with bug tracking software
  CONFIG[env.NODE_ENV].build = await release(env.NODE_ENV)

  console.log('SELECTED', env)
  console.log('CONFIG', CONFIG[env.NODE_ENV])

  return {
    entry: './src/index.js',
    output: {
      filename:
        process.env.NODE_ENV !== 'production'
          ? '[name].js'
          : '[name].[hash].js',
      path: path.resolve(__dirname, 'build'),
    },
    devServer: {
      host: 'start.stage.content.one',
      port: 6006,
      server: {
        type: 'https',
      },
      static: {
        directory: path.join(__dirname, 'build'),
      },
    },
    devtool: 'cheap-module-source-map',
    mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
    plugins: [
      new CleanWebpackPlugin({
        cleanStaleWebpackAssets: false,
      }),
      new MiniCssExtractPlugin({
        filename:
          process.env.NODE_ENV !== 'production'
            ? '[name].css'
            : '[name].[hash].css',
      }),
      new CopyPlugin({
        patterns: ['public'],
      }),
      new HtmlWebpackPlugin({
        template: 'src/index.html',
      }),
      new webpack.DefinePlugin({
        __CONFIG__: JSON.stringify(CONFIG[env.NODE_ENV]),
      }),
    ],
    module: {
      rules: [
        {
          test: /\.less$/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
            },
            {
              loader: 'css-loader',
              options: {
                modules: {
                  localIdentName: '[local]--[hash:base64:5]',
                  // Sets the generated module to use a default export
                  // (which is what 'import styles from "./file.less"' expects)
                  // instead of only named exports.
                  namedExport: false,
                },
              },
            },
            {
              loader: 'less-loader',
            },
          ],
        },
        {
          test: /\.js$/,
          exclude: /(node_modules)/,
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      ],
    },
    optimization: {
      splitChunks: {
        cacheGroups: {
          commons: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all',
          },
        },
      },
    },
  }
}
