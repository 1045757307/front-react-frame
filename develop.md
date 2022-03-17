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
   包含.eslintrc.js（配置文件）和.eslintignore（忽略文件），一般项目初始化后不需要无特殊情况不需要再次修改
