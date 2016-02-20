var path = require('path');
var webpack = require('webpack');

var ENV = process.env.NODE_ENV;

module.exports = {
  entry: [
    "webpack/hot/dev-server",
    './js/main',
    "./styles/app.less"
  ],
  output: {
    filename: './dist/bundle.js'
  },
  debug: true,
  devtool: 'source-map',
  watch: true,
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: ['babel'],
        include: __dirname,
        exclude: /node_modules/
      },
      {
        test: /\.less$/,
        loader: "style!css!less"
      }
    ]
  },
  plugins: (ENV == 'production'
            ? [new webpack.optimize.UglifyJsPlugin({minimize: true})]
            : [])
};
