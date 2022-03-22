# 常见问题

1. eslint 报错之环境未定义

   > Using `babel-preset-react-app` requires that you specify `NODE_ENV` or `BABEL_ENV` environment variablalid values are "development", "test", and "production". Instead, received: undefined.

   大概意思为：NODE_ENV or BABEL_ENV 环境未定义。
   但是实际上我们可以再 webpack 构建文件里找到关于环境的定义`process.env.BABEL_ENV = 'development';process.env.NODE_ENV = 'development';`那么为什么还会有这样的报错呢？
   这里需要修改一下 babel 的配置，来解析 es6 语法，原本的预设 presets 只解析 react 语法。
   解决方法：修改 package.json 中的 babel 配置

   ```
   "babel": {
    "presets": [
      "@babel/preset-env"
    ],
    "plugins": [
      "@babel/plugin-transform-runtime"
    ]
   }
   ```

# 构建脚本 webpack 的调整，scripts 文件夹

#### 路径配置 paths.js 文件的修改

把 setupProxy.js 把代理设置放入 scripts/config 目录中，因为代理设置属于构建脚本配置中的一项`proxySetup: resolveApp('scripts/config/setupProxy.js')`

#### webpack 构建相关 webpack.config.js 文件修改

1. 对于 less 的解析配置 module

   - 安装安装依赖包 less-loader

     ```
     npm install less-loader --save-dev
     ```

   - 在对应位置定义匹配 less 的正则表达式

     ```
     const lessRegex = /\.less$/;
     const lessModuleRegex = /\.module\.less$/;
     ```

   - 在对应位置定义 less loader 的解析函数

     ```
       const getLessModuleLocalIdent = (
       context,
       localIdentName,
       localName,
       options
     ) => {
       const fileNameOrFolder = context.resourcePath.match(/index\.module\.less$/)
         ? '[folder]'
         : '[name]';
       const hash = loaderUtils.getHashDigest(
         path.posix.relative(context.rootContext, context.resourcePath) +
           localName,
         'md5',
         'base64',
         5
       );
       const className = loaderUtils.interpolateName(
         context,
         fileNameOrFolder + '_' + localName + '__' + hash,
         options
       );
       return className.replace('.module_', '_').replace(/\./g, '_');
     };
     ```

   - 在 style loader 的解析函数 getStyleLoaders 中补充关于 less 的处理，当 preProcessor 为 less-loader 时，添加 lessOptions 项

     ```
     if (preProcessor) {
         const options = {
           sourceMap: true,
         };
         if (preProcessor === 'less-loader') {
           options.lessOptions = {
             javascriptEnabled: true,
             modifyVars: {
               'font-size-base': '12px',
               'dropdown-font-size': '12px',
             },
           };
         }
         loaders.push(
           {
             loader: require.resolve('resolve-url-loader'),
             options: {
               sourceMap: isEnvProduction ? shouldUseSourceMap : isEnvDevelopment,
               root: paths.appSrc,
             },
           },
           {
             loader: require.resolve(preProcessor),
             options,
           }
         );
       }
     ```

   - 在 module 中添加关于 less 的配置项

     ```
       {
         test: lessRegex,
         exclude: lessModuleRegex,
         use: getStyleLoaders(
           {
             importLoaders: 3,
             sourceMap: isEnvProduction
               ? shouldUseSourceMap
               : isEnvDevelopment,
           },
           'less-loader'
         ),
         sideEffects: true,
       },
       {
         test: lessModuleRegex,
         use: getStyleLoaders(
           {
             importLoaders: 3,
             sourceMap: isEnvProduction
               ? shouldUseSourceMap
               : isEnvDevelopment,
             modules: {
               getLocalIdent: getLessModuleLocalIdent,
             },
           },
           'less-loader'
         ),
       },
     ```

2. 别名 alias 配置，在 resolve 配置别名，根据实际需要配置即可
   ```
   '@common': path.resolve(paths.appSrc, 'common'),
   '@components': path.resolve(paths.appSrc, 'components'),
   '@api':path.resolve(paths.appSrc, 'api'),
   ```

# 其他规则配置

1. eslint 代码校验规则相关配置
   eslint是一个代码检测工具，可配置、插件式是 ESLint 的最大特点。
   eslint的配置包含.eslintrc.js（配置文件）和.eslintignore（忽略文件），一般项目初始化后不需要无特殊情况不需要再次修改。
   - 安装依赖包 eslint
     ```
     npm install eslint --save-dev
     ```
   - 创建 .eslintrc.js 文件，需要根据提示选择符合你需求的规则
     ```
     npm init @eslint/config
     ```
   - 根据自己的需求配置 rules，这里我们配置了jsx语法多行时的规则，并且引入了prettier，prettier的具体配置看下一条
     ```
      rules: {
        'prettier/prettier': 'error',
        'react/jsx-wrap-multilines': [
          'error',
          { declaration: false, assignment: false },
        ],
      },
     ```

2. prettier 相关配置
   prettier 是一个代码格式化工具，而代码规范规则的设置和代码上的 warn，error 等提醒，则是 eslint 来实现的，所以 prettier 一般与 eslint 一起使用。
   prettier 的配置包含 .prettierrc（配置文件）和 .prettierignore（忽略文件）。
   - 安装依赖包 `prettier`，`eslint-plugin-prettier`和`eslint-config-prettier`
      ```
      npm install prettier eslint-plugin-prettier eslint-config-prettier --save-dev
      ```
   - 建立配置文件，在工程的根目录，创建一个.eslintrc.js文件，文件内容如下：
     ```
     {
        "singleQuote": true,
        "trailingComma": "all",
        "printWidth": 80,
        "proseWrap": "never",
        "arrowParens": "avoid",

        "overrides": [
          {
            "files": ".prettierrc",
            "options": {
              "parser": "json"
            }
          }
        ]
     }
     ```
   - 配置开发工具
     其实到上一步的话，已经将ESlint和Prettier配置完了。但是要想实现在修改代码保存后自动格式化代码这一目标，就要在开发工具上做文章。我们以VScode为例：
     ```
     // 每次保存的时候将代码按eslint格式进行修复
     "eslint.autoFixOnSave": true,
     // 每次保存的时候自动格式化
     "editor.formatOnSave": true,
     // 配置 ESLint 检查的文件类型
     "eslint.validate": [
      "javascript",
      "javascriptreact",
      {
        "language": "vue",
        "autoFix": true
      }
     ],
     ```