/* eslint import/no-extraneous-dependencies: ["off"] */

const path = require("path");
const webpack = require("webpack");
const WebpackDevServer = require("webpack-dev-server");

new WebpackDevServer(
  webpack({
    devtool: "#cheap-eval-source-map",
    entry: [
      "webpack-dev-server/client?http://localhost:3000",
      "webpack/hot/only-dev-server",
      "react-hot-loader/patch",
      "./index"
    ],
    output: {
      path: path.join(__dirname, "dist"),
      filename: "bundle.js"
    },
    plugins: [new webpack.HotModuleReplacementPlugin()],
    resolve: {
      extensions: [".js", ".jsx",'.tsx']
    },
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          loader: "babel-loader",
          include: [
            path.join(__dirname, "../site"),
            path.join(__dirname, "../src"),
            path.join(__dirname, "../libs")
          ]
          // exclude:'node_modules'
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
