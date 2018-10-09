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

* 在 package.json中 写脚本的时候，需要安装 better-npm-run
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

## 2018年9月25（解决webpack运行/打包失败问题）

* 调试 webpack 配置文件
```
// package.json 添加 script
"debug": "webpack --config config/webpack.common.js"

// 在chrome 浏览器输入 chrome://inspect/#devices，然后点击 Open dedicated DevTools for Node
```

* 一直找不到 src 下的文件，需要在 webpack.common.js 中配置
```
resolve: {
    modules: [
        project.paths.client(),
        'node_modules'
    ],
    extensions: ['.js', '.jsx', '.json']
},
```

## 2018年10月8（解决webpack运行/打包失败问题）

运行 ```npm run start``` 报错：```｢wds｣: webpack Dev Server Invalid Options```。解决方法：修改 ```contentBase: project.paths.dist``` 为 ```contentBase: project.paths.dist()```

无法通过ip访问服务，只能通过 ```localhost```。解决方法：设置 ```devServer.host``` 的值为 ```0.0.0.0```。

设置 ```devServer.host=0.0.0.0``` 后，自动打开浏览器，访问 ```0.0.0.0::port```这个错误地址，移除 ```scripts.start``` 中的 ```--open``` 就不会自动打开浏览器了。

## 2018年10月9（解决找不到 constants 文件夹里的变量问题）

文件夹命名为 ```constants``` 时，使用 ```import``` 会找不到变量，造成这个问题的原因是，安装的模块/插件中有名为 ```constants-browserify``` 的插件， 里边有 ```constants.json```， 使用 ```import {xxx} from 'constants'``` 时，实际引入的是这个文件里的内容。解决方法有三个

1. 修改 ```constants``` 文件夹的名字；
2. 使用相对路径 ```import {xxx} from '../constants'```
3. 在 ```webpack.common.js``` 中配置 ```resolve.alias``` ，给创建的 ```constants``` 文件夹取一个别名，如 ```appConstants``` ，然后使用 ```import { xxx } from 'appConstants'``` 即可引入

## 2018年10月9 - 加入redux例子

http://www.redux.org.cn/docs/basics/ExampleTodoList.html

## 2018年10月9 - 引入 eslint

本地安装 ```eslint```
```
cnpm install eslint --save-dev
```

设置一个配置文件 （windows系统）
```
.\node_modules\.bin\eslint --init
```

运行以上命令，然后选择的是根据需求去配置 eslint 配置文件，涉及的问题及答案如下
```
? How would you like to configure ESLint? Answer questions about your style
? Which version of ECMAScript do you use? ES2016
? Are you using ES6 modules? (y/N)
F:\01-localws\practice-create-react-app-pc>
F:\01-localws\practice-create-react-app-pc>
F:\01-localws\practice-create-react-app-pc>
F:\01-localws\practice-create-react-app-pc>.\node_modules\.bin\eslint --init
? How would you like to configure ESLint? Answer questions about your style
? Which version of ECMAScript do you use? ES2015
? Are you using ES6 modules? Yes
? Where will your code run? Browser
? Do you use CommonJS? No
? Do you use JSX? Yes
? Do you use React? Yes
? What style of indentation do you use? Spaces
? What quotes do you use for strings? Single
? What line endings do you use? Windows
? Do you require semicolons? No
? What format do you want your config file to be in? JSON
The config that you've selected requires the following dependencies:

eslint-plugin-react@latest
Successfully created .eslintrc.json file in F:\01-localws\practice-create-react-app-pc
```

回答完以上问题后，在根目录下会生成 ```.eslintrc.json``` 文件，该文件生成后就会提示不符合规则的地方（打开文件，会有红色提示）。

和 ```webpback``` 集成，需要安装 ```eslint-loader```，且要修改 ```webpack``` 的配置文件
```
cnpm install --save-dev eslint-loader

// webpack.common.js js和jsx的loader修改为以下
{
    test: /\.(js|jsx)$/,
    exclude: /node_modules/,
    // loader: 'babel-loader',
    // options: project.compiler_babel
    use: [{
        loader: 'babel-loader',
        options: project.compiler_babel
    }, {
        loader: 'eslint-loader',
        options: { // 这里的配置项参数将会被传递到 eslint 的 CLIEngine 
            enforce: 'pre',
            include: [path.resolve(__dirname, 'src')], // 指定检查的目录,
            // formatter: require('eslint-friendly-formatter') // 指定错误报告的格式规范
        }
    }],
}
```

此时还没配置专门运行 ```eslint``` 的命令，直接运行 ```npm run start``` 时会报错，需要安装 ```eslint-plugin-react```。
```
cnpm install --save-dev eslint-plugin-react
```

对于不想用 ```eslint``` 进行检查的文件或文件夹，在根目录下创建 ```.eslintignore``` ，然后将要忽略检查的文件（夹）写入即可。

检查红色提示，发现引入的组件被提示“已定义未使用”，原因是什么？？ TODO