# practice-create-react-app-pc
练习react脚手架，PC端。

关键词：redux，webpack，babel，sass，是否引入 ```TypeScript```？

# 操作步骤
本项目使用 ```cnpm``` 命令管理插件，如果要用 ```npm``` 命令，将 ```cnpm``` 命令替换为 ```npm``` 命令即可。二者安装方式在此不叙述。

注意：按此步骤实现的时间不同，插件版本可能不一样。

## 2018年9月10
* ```cnpm``` 初始化 ```package.json```
    ```
    cd practice-create-react-app-pc
    npm init
    ... // 按步骤默认/输入相关内容
    ```


* 安装 ```react``` 基础框架
    ```
    cnpm i --save react react-dom

    |--react@16.5.0
    |--react-dom@16.5.0
    ```

* 安装 ```webpack``` 和 ```webpack-dev-server```
    ```
    cnpm install --save webpack webpack-dev-server

    |--webpack@4.17.2
    |--webpack-dev-server3.1.8
    ```

* 安装配置 ```webpack``` 需要用到的库。
    * 安装 ```babel```相关的库，用来打包编译将js语法转换为目前主流浏览器支持的JS语法。
    ```
    cnpm install --save-dev @babel/core @babel/cli @babel/preset-env

    |--@babel/core@7.0.0
    |--@babel/cli@7.0.0
    |--@babel/preset-env7.0.0

    cnpm install --save @babel/polyfill

    |--@babel/polyfill@7.0.0

    cnpm i --dev-save babel-loader

    |--babel-loader@8.0.2
    ```

    * 安装 ```style```相关的库，用来打包css，编译sass。
    ```
    npm install --save-dev  style-loader css-loader sass-loader node-sass 

    |--style-loader@0.23.0
    |--css-loader@1.0.0
    |--sass-loader@7.1.0
    |--node-sass@
    ```

    * 安装 ```html-webpack-plugin```，用于导出html时，可以使用模板（主要是用于配置 ```index.html``` 模板）。安装 ```webpack-merge```，用来合并webpack的配置文件。安装 ```uglifyjs-webpack-plugin```，用来压缩js文件。
    ```
    cnpm i --save-dev html-webpack-plugin

    |--html-webpack-plugin@3.2.0

    cnpm i --save-dev webpack-merge

    |--webpack-merge@4.1.4

    cnpm i --save-dev uglifyjs-webpack-plugin

    |--uglifyjs-webpack-plugin@1.3.0

    ```

* 创建并配置配置文件 ```webpack.**.js```
    * 在根目录下创建 ```babel.config.js```文件，或者 ```.babelrc```文件，并写入配置内容。

    * 在根目录下创建 ```config``` 文件夹，并在 ```config``` 下创建并配置 ```env.config.js``` 和    ```project.config.js```。```env.config.js```里配置编译相关的环境内容，分开发环境( ```development``` )和生产环境( ```production``` )。```project.config.js```里配置开发环境和生产环境的共同环境。

    * 在 ```config``` 下创建并配置 ```webpack.common.js```， ```webpack.dev.js``` ， ```webpack.prod.js``` 。```webpack.common.js```里配置开发环境( ```development``` )和生产环境( ```production``` )公用的配置。 ```webpack.dev.js``` 里配置开发环境( ```development``` )特有的配置， ```webpack.prod.js``` 里配置生产环境( ```production``` )特有的配置。

* 安装 ```Redux``` 及相关组件
    ```
    cnpm i react-router react-redux react-router-redux redux redux-thunk redux-logger

    |--react-router@4.3.1
    |--react-router-redux@4.0.8
    |--react-redux@5.0.7
    |--redux@4.0.0
    |--redux-thunk@2.3.0
    |--redux-logger@3.0.6

    ```

* 创建 ```public``` 文件夹，并创建 ```index.html```文件。

## 2018年9月11（接上一天）

* 创建 ```src``` 文件夹，并创建 ```index.jsx``` 文件。

* 在package.json中写脚本的时候，需要安装 better-npm-run
* 在当前node版本下全局安装 webpack，安装webpack-cli

## 2018年9月21（解决webpack运行/打包失败问题）

* 安装 clean-webpack-plugin， mini-css-extract-plugin，babel-plugin-transform-runtime
```
cnpm i --save-dev clean-webpack-plugin mini-css-extract-plugin @babel/plugin-transform-runtime
```

* 安装
```
cnpm i --save babel-polyfill babel-runtime
cnpm install --save-dev @babel/preset-react
```
TODO npm run build 报错……