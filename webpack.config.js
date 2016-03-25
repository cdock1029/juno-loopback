const path = require('path')

module.exports = {
  entry: {
    app: ['./client/src/app.js'],
  },
  output: {
    path: path.resolve(__dirname, 'client/public'),
    publicPath: '/',
    filename: 'bundle.js',
  },
  devtool: 'source-map',
  devServer: {
    contentBase: 'client/public',
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react', 'stage-2'],
        },
      },
      {
        test: /\.json$/,
        loader: 'json',
      },
    ],
  },
}
