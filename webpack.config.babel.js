const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

//絶対パスにする
const ASSET_PATH = process.env.ASSET_PATH || '/';
const PROJECT = process.env.npm_lifecycle_event || null;

module.exports = {
  devtool: 'source-map',
  entry:
    PROJECT == 'start:sales'
      ? './sales/src/index.tsx'
      : PROJECT == 'start:customer'
      ? './customer/src/index.tsx'
      : null,
  output: {
    path: path.join(__dirname, '/dist'),
    publicPath: ASSET_PATH,
    filename: 'index_bundle.js',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.s?css$/,
        exclude: /node_modules(?!\/@storybook\/addon-info)/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              url: false,

              importLoaders: 2,
            },
          },
          {
            loader: 'sass-loader',
          },
        ],
      },
      {
        test: /\.(jpg|png|svg)$/,
        loaders: 'url-loader',
      },
      {
        test: /\.mjs$/,
        include: /node_modules/,
        type: 'javascript/auto',
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template:
        PROJECT == 'start:sales'
          ? './sales/src/index.html'
          : PROJECT == 'start:customer'
          ? './customer/src/index.html'
          : null,
    }),
  ],
  devServer: {
    historyApiFallback: true,
  },
};
