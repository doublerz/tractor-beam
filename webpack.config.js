module.exports = {
  context: __dirname,
  entry: './src/index.js',
  output: {
    path: __dirname + '/www',
    filename: 'index.js'
  },
  devtool: 'eval',
  debug: true
}
