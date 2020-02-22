const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const basePath = path.resolve(__dirname, "../../");

module.exports = {
  mode: "production",
  entry: {
    site: path.join(basePath, "site")
  },
  output: {
    path: path.resolve(basePath, "dist/site"),
    chunkFilename: "[chunkhash:12].js",
    filename: "[chunkhash:12].js"
  },
  optimization: {
    minimize: true
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[chunkhash:12].css"
    }),
    new HtmlWebpackPlugin({
      template: "./index.html",
      favicon: path.join(basePath, "site/assets/favicon.ico")
    }),
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify("production")
    }),
    new webpack.optimize.ModuleConcatenationPlugin()
  ],
  resolve: {
    extensions: [".ts", ".js", ".tsx"]
  },
  module: {
    unknownContextCritical : false,
    rules: [ 
      {
        test: /\.(ts|tsx)$/,
        use: "awesome-typescript-loader",
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
 
};
