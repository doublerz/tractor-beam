var webpack = require('webpack');
require('dotenv').load()

module.exports = {
  context: __dirname,
  entry: "./js/index.js",
  output: {
    path: __dirname + "/www",
    filename: "index.js"
  },
  devtool: "eval",
  debug: true,
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: "transform?brfs"
      },
      {
        test: /\.js$/,
        loader: "transform?envify"
      }
    ],
    noParse: [
      /fastclick/
    ]
  }
};
