const path = require('path');
const glob = require('glob');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const VueLoaderPlugin = require("vue-loader/lib/plugin")

module.exports = (env, options) => {
  const devMode = options.mode !== 'production';

  return {
    optimization: {
      minimizer: [
        new TerserPlugin({ cache: true, parallel: true, sourceMap: devMode }),
        new OptimizeCSSAssetsPlugin({})
      ]
    },
    entry: {
      'app': glob.sync('./vendor/**/*.js').concat(['./js/app.js']),
      'loadIka': glob.sync('./vendor/**/*.js').concat(['./js/pirika_js/ika/packs/loadIka.js']),
      'loadZxcv': glob.sync('./vendor/**/*.js').concat(['./js/pirika_js/zxcv/packs/loadZxcv.js']),
      'loadArrow': glob.sync('./vendor/**/*.js').concat(['./js/pirika_js/arrow/packs/loadArrow.ts']),
      'loadSquare': glob.sync('./vendor/**/*.js').concat(['./js/pirika_js/square/packs/loadSquare.js']),
    },
    output: {
      filename: '[name].js',
      path: path.resolve(__dirname, '../priv/static/js'),
      publicPath: '/js/'
    },
    devtool: devMode ? 'eval-cheap-module-source-map' : undefined,
    module: {
      rules: [
        {
          test: /\.vue$/,
          use: [
            {
              loader: "vue-loader",
              options: { sourceMap: true },
            },
          ]
        },
        {
          test: /\.js$/,
          use: [
            {
              loader: "babel-loader",
              options: {
                presets: [
                  "@babel/preset-env"
                ]
              }
            }
          ]
        },
        {
          test: /\.ts$/,
          use: [
            {
              loader: "babel-loader",
              options: {
                presets: [
                  "@babel/preset-env"
                ]
              }
            },
            {
              loader: 'ts-loader',
              options: {
                  appendTsSuffixTo: [/\.vue$/]
              }
            }
          ]
        },
        {
          test: /\.scss$/,
          use: [
            "vue-style-loader",
            {
              loader: "css-loader",
              options: { sourceMap: true },
            },
            {
              loader: "sass-loader",
              options: { sourceMap: true },
            },
          ],
        },
        { 
          test: /\.pug$/,
          loader: 'pug-plain-loader'
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader'
          }
        },
        {
          test: /\.[s]?css$/,
          use: [
            MiniCssExtractPlugin.loader,
            'css-loader',
            'sass-loader',
          ],
        }
      ]
    },
    plugins: [
      new VueLoaderPlugin(),
      new MiniCssExtractPlugin({ filename: '../css/[name].css' }),
      new CopyWebpackPlugin([{ from: 'static/', to: '../' }])
    ]
  }
};
