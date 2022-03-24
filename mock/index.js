const fs = require('fs');
const path = require('path');
const detect = require('detect-port-alt');
const chalk = require('react-dev-utils/chalk');
const express = require('express');

const app = express();

const appDirectory = fs.realpathSync(process.cwd());
const dotenv = path.resolve(appDirectory, '.env');

if (fs.existsSync(dotenv)) {
  require('dotenv-expand')(
    require('dotenv').config({
      path: dotenv,
    }),
  );
}

const HOST = '0.0.0.0';
const DEFAULT_PORT = parseInt(process.env.REACT_APP_MOCK_PORT, 10) || 3030;

detect(DEFAULT_PORT, HOST)
  .then(port => {
    if (port === DEFAULT_PORT) {
      return Promise.resolve(port);
    } else {
      console.log(
        chalk.red('端口被占用，请重新配置REACT_APP_MOCK_PORT环境变量\n'),
        chalk.red('端口被占用，请重新配置REACT_APP_MOCK_PORT环境变量\n'),
        chalk.red('端口被占用，请重新配置REACT_APP_MOCK_PORT环境变量\n'),
      );
      process.exit(1);
    }
  })
  .then(port => {
    // 启动express服务
    app.get('/', (req, res) => {
      res.send('mock service');
    });
    app.use((req, res, next) => {
      console.log(`接到请求${req.url}`);
      // 请求公共处理
      setTimeout(next, 2500);
    });

    // 这里的'/api'在实际项目中需要替换成接口对应的字段，如你的接口是'/api/user/current-user'，那么此处就为'/api'
    app.use('/api', require('./api'));

    app.listen(port, err => {
      console.log(chalk.green(`Mock服务启动成功，监听端口为${port}`));
    });
  });
