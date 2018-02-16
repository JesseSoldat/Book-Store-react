const path = require('path');
const webpack = require('webpack');

module.exports = () => {
  return {
    entry: ['babel-polyfill', './src/client.js'],
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'public'),
      filename: 'bundle.js'
    },
    watch: true,
    module:{
      loaders: [
        {
          test:/\.js$/,
          exclude:/node_modules/,
          loader: 'babel-loader',
        }
      ]
    },
    devtool: 'inline-source-map',
    devServer: {
      contentBase: path.join(__dirname, 'public'),
      historyApiFallback: true,
   
    }

  }
 
}