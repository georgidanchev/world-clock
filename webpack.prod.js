const path = require('path')
const merge = require('webpack-merge')
const webpack = require('webpack')
const autoPrefixer = require('autoprefixer')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const common = require('./webpack.config')

module.exports = merge(common, {
  mode: 'production',
  devtool: 'none',
  output: {
    filename: '[name].bundle.[contentHash].js',
    path: path.resolve(__dirname, 'dist'),
  },
  optimization: {
    minimizer: [
      new OptimizeCssAssetsPlugin(),
      new TerserPlugin(),
      new HtmlWebpackPlugin(
        {
          template: './src/index.html',
          minify: {
            removeRedundantAttributes: true,
            collapseWhitespace: true,
            removeComments: true,
            useShortDoctype: true,
          },
        },
      ),
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].bundle.[contentHash].css',
    }),
    new webpack.LoaderOptionsPlugin({
      options: {
        postcss: [
          autoPrefixer(),
        ],
      },
    }),
  ],
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
    ],
  },
})