const webpack = require('webpack');

module.exports = {
  entry: ['./src/app.js'],
  output: {
    path: __dirname + '/ParseCloud/public',
    publicPath: '/',
    filename: 'bundle.js'
  },
  devtool: 'source-map',
  devServer: {
    contentBase: './ParseCloud/public'
  },
  plugins: [
    new webpack.EnvironmentPlugin([
      'JUNO_APP_ID',
      'JUNO_JS_KEY'
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
      }
    ]
  },
}
