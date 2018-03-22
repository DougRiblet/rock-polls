const path = require('path')

module.exports = {
  mode: 'development',
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
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader'
      }
    ]
  }
}
