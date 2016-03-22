const webpack = require('webpack');

module.exports = {
  entry: ['./src/app.js'],
  output: {
    path: __dirname + '/public',
    publicPath: '/',
    filename: 'bundle.js'
  },
  devtool: 'source-map',
  devServer: {
    contentBase: './public'
  },
  plugins: [
    new webpack.EnvironmentPlugin([
      'PARSE_APP_ID',
      'PARSE_JS_KEY',
      'PARSE_REST_KEY'
    ])
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react', 'stage-2']
        }
      },
      {
        test: /\.json$/,
        loader: 'json'
      }
    ]
  }
}
