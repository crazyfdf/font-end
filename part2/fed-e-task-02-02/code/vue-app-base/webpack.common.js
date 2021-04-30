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
