const ExtractTextPlugin = require('extract-text-webpack-plugin');
module.exports = {
  entry: {
    js: './app/index.js',
    html: './app/index.html',
  },
  output: {
    path: './build/',
    filename: 'js/bundle.js'
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.css']
  },
  devtool: 'eval',
  module: {
    loaders: [
      {test: /\.jsx?$/, exclude: /node_modules/, loader: 'babel-loader'},
      {test: /\.css$/, loader: 'style!css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]'},
      {test: /index\.html$/, loader: 'file-loader', query: {name: 'index.html'}}
    ]
  },
  plugins: [
    new ExtractTextPlugin('style.css', { allChunks: true }),
  ],
  stylus: {
  }
};
