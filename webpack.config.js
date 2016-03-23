module.exports = {
  entry: ['./client/src/app.js'],
  output: {
    path: `${__dirname}/client/public`,
    publicPath: '/',
    filename: 'bundle.js',
  },
  devtool: 'source-map',
  devServer: {
    contentBase: './client/public',
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
