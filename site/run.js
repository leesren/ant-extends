/* eslint import/no-extraneous-dependencies: ["off"] */

const path = require("path");
const webpack = require("webpack");
const WebpackDevServer = require("webpack-dev-server");
const HtmlWebpackPlugin = require('html-webpack-plugin');
  const { CleanWebpackPlugin } = require('clean-webpack-plugin');

  
new WebpackDevServer(
  webpack({
    devtool: "#cheap-eval-source-map",
    entry: {
      index: "./App.tsx"
    },
    output: {
      path: path.join(__dirname, "dist"),
      filename: "bundle.js"
    },
    plugins: [ 
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
        title: 'Output Management',
      }),
    ],
    resolve: {
      extensions: ['.ts', '.tsx', '.js', 'jsx']
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /(node_modules)/,
          use: {
            loader: "babel-loader"
          }
        },
        {
          test: /\.tsx?$/,
          use: "ts-loader",
          exclude: /node_modules/
        },
        {
          test: /\.css$/,
          use: ["style-loader", "css-loader"]
        },
        {
          test: /\.scss$/,
          use: ["style-loader", "css-loader", "sass-loader"]
        },
        {
          test: /\.less$/,
          use: [
            {
              loader: "style-loader"
            },
            {
              loader: "css-loader"
            },
            {
              loader: "less-loader",
              options: {
                javascriptEnabled: true
              }
            }
          ]
        },
        {
          test: /\.(eot|svg|ttf|woff|woff2)(\?.+)?$/,
          loader: "file-loader"
        },
        {
          test: /\.(jpe?g|png|gif)(\?.+)?$/,
          loader: "url-loader"
        },
        {
          test: /\.md$/,
          loader: "raw-loader"
        }
      ]
    },
    mode: "development"
  }),
  {
    publicPath: "/",
    hot: true,
    historyApiFallback: true,
    stats: { colors: true }
  }
).listen(3000, "localhost", error => {
  if (error) {
    throw error;
  }
});
