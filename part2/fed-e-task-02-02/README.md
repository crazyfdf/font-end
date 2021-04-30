# 一、简答题

#### 1、Webpack 的构建流程主要有哪些环节？如果可以请尽可能详尽的描述 Webpack 打包的整个过程。
1. 根据webpack.config.js配置找到资源文件的打包入口。
2. 顺着入口文件的代码AST解析代码所依赖的资源模块。
3. 解析每个资源模块所对应的依赖，形成一个所有用到文件的依赖关系的依赖树。
4. 递归依赖树，找到每个节点对应的资源文件.
5. 根据配置文件中的配置，找到文件加载器，去加载这个模块。
6. 将加载的结果放到打包结果文件中。实现整个项目的打包。

　

　

#### 2、Loader 和 Plugin 有哪些不同？请描述一下开发 Loader 和 Plugin 的思路。

　
1. 区别：
    - Loader加载器。主要是用来解析和检测对应资源，负责源文件从输入到输出的转换，它专注于实现资源模块加载

    - Plugin插件。主要是通过webpack内部的钩子机制，在webpack构建的不同阶段执行一些额外的工作，它的插件是一个函数或者是一个包含apply方法的对象，接受一个compile对象，通过webpack的钩子来处理资源
2. 开发思路：
    - Loader加载器。通过module.exports导出一个函数，该函数默认参数一个参数source(即要处理的资源文件)，在函数体中处理资源(loader里配置响应的loader后)，通过return返回最终打包后的结果(这里返回的结果需为字符串形式)

    - Plugin插件。通过钩子机制实现，插件必须是一个函数或包含apply方法的对象，在方法体内通过webpack提供的API获取资源做响应处理，将处理完的资源通过webpack提供的方法返回该资源

3. 例子：
    - Loader加载器。
    ```
    const marked = require("marked");
    module.exports = source => {
      const html = marked(source);
      return `module.exports=${JSON.stringify(html)}`;
    };
    ```
    - Plugin插件
    ```
    class MyPlugin {
      apply(compiler) {
        compiler.hooks.emit.tap("MyPlugin", compilation => {
          for (const name in compilation.assets) {
            if (name.endsWith('.js')) {
              const contents=compilation.assets[name].source()
              const withoutComments=contents.replace(/\/\*\*+\*\//g,'')
              compilation.assets[name]={
                source:()=>withoutComments,
                size:()=>withoutComments.length
              }
            }
            console.log();
          }
        });
      }
    }
    ```
    　

# 二、编程题

#### 1、使用 Webpack 实现 Vue 项目打包任务

具体任务及说明：

1. 在 code/vue-app-base 中安装、创建、编辑相关文件，进而完成作业。
2. 这是一个使用 Vue CLI 创建出来的 Vue 项目基础结构
3. 有所不同的是这里我移除掉了 vue-cli-service（包含 webpack 等工具的黑盒工具）
4. 这里的要求就是直接使用 webpack 以及你所了解的周边工具、Loader、Plugin 还原这个项目的打包任务
5. 尽可能的使用上所有你了解到的功能和特性



**提示：(开始前必看)**

在视频录制后，webpack 版本以迅雷不及掩耳的速度升级到 5，相应 webpack-cli、webpack-dev-server 都有改变。

项目中使用服务器的配置应该是改为下面这样：

```json
// package.json 中部分代码
"scripts": {
	"serve": "webpack serve --config webpack.config.js"
}
```

vue 文件中 使用 style-loader 即可

**其它问题, 可先到 https://www.npmjs.com/ 上搜索查看相应包的最新版本的配置示例, 可以解决大部分问题.**



#### 作业要求

本次作业中的编程题要求大家完成相应代码后

- 提交一个项目说明文档，要求思路流程清晰。
- 或者简单录制一个小视频介绍一下实现思路，并演示一下相关功能。
- 最终将录制的视频或说明文档和代码统一提交至作业仓库。