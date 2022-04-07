const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  entry: ["regenerator-runtime/runtime.js", "./client/index.js"],
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'build')
  },
  mode: process.env.NODE_ENV,
  module: {
    rules: [
      {
        test: /\.jsx?/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: ['@babel/env', '@babel/react']
        }
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.png|jpg|gif$/,
        use: ['file-loader'],
      },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './client/views/index.html'
    })
  ],
  devServer: {
    static: {
      publicPath: 'build',
      directory: path.resolve(__dirname, 'build')
    },
    proxy: {
      '/api': 'http://localhost:3000'
    },
  }
};