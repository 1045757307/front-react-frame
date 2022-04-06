# 开发指南（用户手册）

## 项目依赖第三方库
1. react
	- react
	- react-dom

		官方文档地址：https://zh-hans.reactjs.org/

2. UI组件
	- antd: 组件库

		官方文档地址：https://ant.design/components/overview-cn/

	- pro-layout：基于antd的布局组件

		官方文档地址：https://procomponents.ant.design/components/layout


3. ag-grid
	- ag-grid-community: ag-grid表格
	- ag-grid-enterprise: ag-grid表格
	- ag-grid-react: react ag-grid表格

		官方文档地址：https://www.ag-grid.com/react-grid/


4. 接口请求
	- axios: 接口请求

		官方文档地址：https://github.com/axios/axios

5. 国际化
	- i18next: 国际化
	- react-i18next: react国际化

		官方文档地址：https://react.i18next.com/

6. 路由
	- react-router-dom: react路由

		官方文档地址：https://reactrouter.com/web/guides/quick-start

7. 工具方法
	- classnames: 设置jsx语法中的className属性

		官方文档地址：https://github.com/JedWatson/classnames

	- js-cookie: cookie操作

		官方文档地址：https://github.com/js-cookie/js-cookie

	- lodash: 提供一些常用的工具方法

		官方文档地址：https://lodash.com/docs/4.17.15

	- querystringify: querystring处理

		官方文档地址：https://www.npmjs.com/package/querystringify

	- mimetype: js文件内容类型

	 	仓库地址：https://github.com/jshttp/mime-types

## 环境变量
1. REACT_APP_MOCK_PORT: mock服务端口号，默认3030

2. REACT_APP_PROXY_SERVICE: 开发环境接口服务代理，需要根据项目实际情况配置，框架中用http://localhost:3000 替代

3. REACT_APP_TEST_SERVICE: 测试环境接口服务地址，需要根据项目实际情况配置

4. REACT_APP_PROD_SERVICE: 生产环境接口服务地址，需要根据项目实际情况配置

5. REACT_APP_PROXY_URL_REWRITE: 是否重写url，默认false。此环境变量用于开发环境以及mock开发环境。
	例如：/api/resource/user-menu重写为/resource/user-menu

6. GENERATE_SOURCEMAP: 是否使用source map

7. REACT_APP_MOCK: 打开mock环境的开关，等于mock时使用mock
## 框架配置
1. 环境变量配置，在 .env 文件中进行开发、测试、生产环境接口服务地址配置

2. 开发环境接口服务代理配置，scripts/config/setupProxy.js 文件中根据实际的开发环境接口地址配置 pathRewrite（重写url） 和 createProxyMiddleware（接口代理中间件），实际规则在 setupProxy.js 中有注释

3. 公共接口配置
	 框架中存在启动项目时就需要调用的接口，框架中是使用的mock数据，但是在实际使用中需要把接口地址换为真实数据，如下：

	 - 用户信息接口: /api/user/current-user，位置：src/common/components/Main

	 - 菜单接口: /api/resource/user-menu，位置：src/common/components/Layout/BasicLayout.jsx

4. mock数据配置
	 框架中可使用 mock 模拟接口数据，具体使用方式参考 mock 文件夹下的注释

5. 更换项目名称和logo
	 把框架内的名称换为项目的实际名称和logo，需要修改的地方有：
	 - public/index.html 文件中 head 部分
	 - src/common/components/Layout/BasicLayout.jsx 文件中 ProLayout 对应的title和logo

6. 框架已存在但需要补充的页面有home(首页) 和login(登录页)，均为空白页面，需要在项目中根据实际需要完成。
## 框架启动
1. 项目安装

2. 项目启动

3. 项目构建
