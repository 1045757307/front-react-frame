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
