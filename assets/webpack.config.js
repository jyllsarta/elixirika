const path = require('path');
const glob = require('glob');
const webpack = require('webpack');
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');
const {VueLoaderPlugin} = require("vue-loader")

module.exports = (env, options) => {
  const devMode = options.mode !== 'production';

  return {
    optimization: {
      minimizer: [
        new CssMinimizerPlugin(),
      ]
    },
    entry: {
      'app': glob.sync('./vendor/**/*.js').concat(['./js/app.js']),
      'loadIka': glob.sync('./vendor/**/*.js').concat(['./js/pirika_js/ika/packs/loadIka.js']),
      'loadZxcv': glob.sync('./vendor/**/*.js').concat(['./js/pirika_js/zxcv/packs/loadZxcv.js']),
      'loadArrow': glob.sync('./vendor/**/*.js').concat(['./js/pirika_js/arrow/packs/loadArrow.js']),
      'loadSquare': glob.sync('./vendor/**/*.js').concat(['./js/pirika_js/square/packs/loadSquare.js']),
      'loadQueens': glob.sync('./vendor/**/*.js').concat(['./js/pirika_js/queens/packs/loadQueens.js']),
      'loadRhomb': glob.sync('./vendor/**/*.js').concat(['./js/pirika_js/rhomb/packs/loadRhomb.js']),
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
              options: {
                sourceMap: true,
              },
            },
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
      ]
    },
    plugins: [
      new VueLoaderPlugin(),
      new CopyWebpackPlugin({patterns: [{ from: 'static', to: '../' }]}),
      new webpack.DefinePlugin({
        __VUE_OPTIONS_API__: true,
        __VUE_PROD_DEVTOOLS__: false
      })
    ]
  }
};
