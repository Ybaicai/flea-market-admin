const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const webpack = require('webpack');

const config = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  devtool: 'none',
  devServer: {
    contentBase: './dist',
    hot: true,
    proxy: {
      '/api': {
        target: 'http://www.marketadmin.com', // 目标接口的域名
        // secure: true,  // https 的时候 使用该参数
        changeOrigin: true,  // 是否跨域
        pathRewrite: {
          '^/api': ''  // 重写路径
        }
      },
      '/upload': {
        target: 'https://jsonplaceholder.typicode.com/posts/', // 目标接口的域名
        secure: true,  // https 的时候 使用该参数
        changeOrigin: true,  // 是否跨域
        pathRewrite: {
          '^/upload': ''  // 重写路径
        }
      }
    }
  },
  plugins: [
    new CleanWebpackPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html',
    })
  ],
  module: {
    rules: [{
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.less$/,
        use: ['style-loader', 'css-loader', 'less-loader']
      },
      {
        test: /\.(jpg|png|gif|bmp|jpeg|webp)$/,
        use: 'url-loader?limit=7631&name=[hash:8]-[name].[ext]'
      },
      {
        test: /\.(ttf|eot|svg|woff|woff2)$/,
        use: 'url-loader'
      },
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.vue$/,
        use: 'vue-loader'
      },
    ]
  },
    resolve: {
      alias: {
        "vue$": "vue/dist/vue.js"
      }
    }

};

module.exports = config;