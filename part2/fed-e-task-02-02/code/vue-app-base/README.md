# webpack打包vue项目配置
创建三个文件：
- webpack.common.js：公共配置文件
- webpack.dev.js：运行开发时配置文件
- webpack.prod.js：生产打包时配置文件

```
"scripts": {
    "serve": "webpack serve --config webpack.dev.js",//运行项目
    "build": "webpack --config webpack.prod.js",//打包项目
    "lint": "eslint ./src"//eslint 检查
  },
```
## webpack.common.js
```
const path = require("path"); //添加依赖

const VueLoaderPlugin = require("vue-loader/lib/plugin"); //打包vue
const HtmlWebpackPlugin = require("html-webpack-plugin"); //打包html
const { webpack, HotModuleReplacementPlugin, DefinePlugin } = require("webpack");

module.exports = {
  //入口文件
  entry: "./src/main.js",
  //打包出口文件 这个里面我们需要用到__dirname来生成一个绝对路径
  output: {
    path: path.resolve(__dirname, "dist"),
  },

  module: {
    rules: [
      {
        test: /\.m?js$/,
        //不包括node_modules中的js代码
        exclude: /node_modules/,
        use: {
          // 用babel-loader进行代码的转换编译
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
      {
        test: /\.vue$/,
        //不包括node_modules中的vue代码
        exclude: /node_modules/,
        //用于解析vue文件
        loader: "vue-loader",
      },
      {
        test: /\.css$/,
        //css-loader只负责加载将css文件进行加载
        //style-loader负责将样式添加到DOM中
        //使用多个loader是，是从右向左
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.less$/,
        use: [
          {
            loader: "style-loader",
          },
          {
            loader: "css-loader",
          },
          {
            loader: "less-loader",
            options: {
              lessOptions: {
                strictMath: true,
              },
            },
          },
        ],
      },
      {
        test: /\.s[ac]ss$/,
        use: [
          // 将 JS 字符串生成为 style 节点
          "style-loader",
          // 将 CSS 转化成 CommonJS 模块
          "css-loader",
          // 将 Sass 编译成 CSS
          "sass-loader",
        ],
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: "url-loader",
        options: {
          esModule: false, //不加这个路径会报错
          limit: 8 * 1024, //超过8kb会按文件储存，小于8kb转换为base64
        },
      },
    ],
  },
  plugins: [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      //创建一个在内存中生成的html页面的插件
      title: "vue",
      filename: "index.html",
      template: path.join(__dirname, "./public/index.html"),
    }),
    new HotModuleReplacementPlugin(),
    new DefinePlugin({
      BASE_URL: process.env.NODE_ENV, //用来解析index.html中的<%= BASE_URL %>
    }),
  ],
};


```
## webpack.dev.js
```
const commonConfig = require("./webpack.common");
const { merge } = require("webpack-merge");

const path = require("path");

module.exports = merge(commonConfig, {
  mode: "development",
  devtool: "eval-cheap-module-source-map",
  module: {
    rules: [
      {
        // eslint-loader预处理
        test: /\.(vue|js)$/,
        exclude: /node_modules/,
        use: "eslint-loader",
        enforce: "pre",
      },
    ],
  },
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    port: 8000,
    open: true,
    hot: true,
  },
});

```
## webpack.prod.js
```
const commonConfig = require("./webpack.common");
const { merge } = require("webpack-merge");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
// const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
// const TerserPlugin = require("terser-webpack-plugin");

const path = require("path");

module.exports = merge(commonConfig, {
  mode: "production",
  output: {
    filename: "[name]-[contenthash].js", //定位文件发生变化时改变
  },
  optimization: {
    usedExports: true, // 标记未引用代码
    // concatenateModules: true, // 尽可能将所有模块合并输出到一个函数中
    minimize: true, //移除未使用代码
    // minimizer: [
    //   //css压缩
    //   new OptimizeCSSAssetsPlugin(),
    //   new TerserPlugin(),
    // ],
    splitChunks: {
      chunks: "all",
    },
  },
  // module: {
  //   rules: [
  //     {
  //       test: /\.css$/,
  //       use: [MiniCssExtractPlugin.loader, "css-loader"],
  //     },
  //   ],
  // },

  plugins: [
    //用于每次生成的时候，清理上次的打包文件
    new CleanWebpackPlugin(),
    // new MiniCssExtractPlugin(),
  ],
});
```