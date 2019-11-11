const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  devtool: 'source-map',
  entry: './src/index.js',
  output: {
    path: path.join(__dirname, "/dist"),
    filename: "index_bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/react']
            ]
          }
        }
      },
      {
        test: /\.s?css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              url: false,

              importLoaders: 2
            },
          },
          {
            loader: 'sass-loader',

          }
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
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({ template: "./src/index.html" })
  ]
}