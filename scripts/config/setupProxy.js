const {createProxyMiddleware} = require('http-proxy-middleware')

const isMock = process.env.REACT_APP_MOCK === 'mock';
const port = process.env.REACT_APP_MOCK_PORT; // 获取配置得端口号

// 是否需要重写url mock不重写
const isRewriteUrl = process.env.REACT_APP_PROXY_URL_REWRITE;

const mockServer = `http://localhost:${port}`; // mock服务地址

const proxyService = `${process.env.REACT_APP_PROXY_SERVICE}`; // 代理服务

module.exports = function(app) {
	const proxyConfig = {
		target: `${isMock ? mockServer : proxyService}`, // 代理服务器地址
		changeOrigin: true, // 改变host
	}
  // 是否需要重写接口的某一部分
	if (!isMock && isRewriteUrl == 'true') {
		proxyConfig.pathRewrite = {
			'^/api': ''
		}
	}
	app.use(
    // createProxyMiddleware的第一个参数可以是字符串也可以是数组，如需要设置代理的接口为'/api/user/current-user'，那这里写入'/api'即可
		createProxyMiddleware('/api', proxyConfig),
	);
}
