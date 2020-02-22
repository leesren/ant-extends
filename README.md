# ant-design 扩展组件

## Getting Started

### Install

```bash
npm install ant-extends --save
```

### Usage

We are die hard fans of ECMAScript 6, so we recommend you writing code in modern javascript.

```js
import { Button } from "ant-extends";
```

```js
import { Button } from "ant-extends/next";
```

### Config

With webpack, you need additional loaders to build with `ant-extends`.

```js
const webpack = require('webpack');

module.exports = {
  entry: {
    src: 'path/to/src'
  },
  output: {
    path: 'path/to/output'
    publicPath: '/public',
    chunkFilename: '[chunkhash:12].js',
    filename: '[chunkhash:12].js'
  },
  plugins: [
    new webpack.DefinePlugin({ 'process.env.NODE_ENV': JSON.stringify('production') }),
    new webpack.optimize.UglifyJsPlugin({
      output: {
        comments: false
      }
    })
  ],
  resolve: {
    extensions: ['.js', '.jsx']
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        include: ['path/to/src']
      },
      {
        test: /\.css$/,
        loaders: ['style-loader', 'css-loader']
      },
      {
        test: /\.(ttf|eot|svg|woff|woff2)(\?.+)?$/,
        loader: 'file-loader?name=[hash:12].[ext]'
      }
    ]
  }
}
```

## Contributing

## Acknowledgments

## Credits

## License

MIT
