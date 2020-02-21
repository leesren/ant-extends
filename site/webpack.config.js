const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
  const { CleanWebpackPlugin } = require('clean-webpack-plugin');
module.exports = {
  mode: "development",
  entry: {
    index: "./App.tsx"
  },
  output: {
    path: path.join(__dirname, "dist"), // 打包后的输出目录
    filename: "bundle.js",
    publicPath: '/',
  },
  resolve: {
    extensions: [".ts", ".js", ".tsx"]
  },
  devtool: "#cheap-eval-source-map",
  plugins: [
    new CleanWebpackPlugin(),
    // new HtmlWebpackPlugin({
    //   title: 'Output Management',
    //   filename: './index.html'
    // }),
  ],
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
  devServer:{
    contentBase: './',
    hot: true,
    historyApiFallback: true,
    stats: { colors: true }
  }
};
