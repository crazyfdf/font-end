const commonConfig = require("./webpack.common");
const { merge } = require("webpack-merge");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
// const MinCssExtractPlugin = require("mini-css-extract-plugin");
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
    // new TerserPlugin()
    // ],
    splitChunks: {
      chunks: "all",
    },
  },
  // module: {
  //   rules: [
  //     {
  //       test: /\.less$/,
  //       use: [MinCssExtractPlugin.loader, "css-loader", "less-loader"],
  //     },
  //     {
  //       test: /\.css$/,
  //       use: [MinCssExtractPlugin.loader, "css-loader"],
  //     },
  //   ],
  // },

  plugins: [
    //用于每次生成的时候，清理上次的打包文件
    new CleanWebpackPlugin(),
    // new MinCssExtractPlugin(),
  ],
});
