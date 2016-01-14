module.exports = {
  entry: ['./src/app.js'],
  output: {
    path: __dirname + '/ParseCloud/public',
    publicPath: '/',
    filename: 'bundle.js'
  },
  devServer: {
    contentBase: './ParseCloud/public'
  },
  module: {
    loaders: [
      {
        test: /.js?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react', 'stage-2']
        }
      }
    ]
  },
}
