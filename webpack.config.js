const path = require('path')

module.exports = {
  context: __dirname,
  entry: './client/index.jsx',
  output: {
    path: path.join(__dirname, '/client/public/bundle'),
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  stats: {
    colors: true,
    reasons: true,
    chunks: false
  },
  devServer: {
    contentBase: path.join(__dirname, '/client/public'),
    publicPath: '/bundle/'
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader'
      }
    ]
  }
}
