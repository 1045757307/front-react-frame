/**
 * 这里可以坐做二级分发，也可以直接导出mock数据
 */
const router = require('express').Router();

/**二级分发这样实现 './user'对应的是一个user文件夹，里面内容如此文件，可以继续分发也可以直接导出mock数据***************************************/
// router.use('/user', require('./user'));
// router.use('/dept', require('./dept'));

/**直接导出mock数据如下所示***************************************/
const Mock = require('mockjs');
/**
 * 获取当前用户信息
 */
router.post('/user/current-user', (req, rep) => {
  rep.send({
    data: {
      jobNumber: Mock.mock('@id'),
      userName: Mock.mock('@name'),
      email: Mock.mock('@email'),
      phone: '13501042669',
      dept: 'IT',
      avatar: Mock.Random.image('100x100', '#50B347', '#FFF', 'avatar'),
      powerList: ['10010', '10011', '10012'],
      roleList: [],
    },
    msg: null,
    success: true,
  });
});

/**
 * 获取菜单树
 */
router.post('/resource/user-menu', (req, rep) => {
  rep.send({
    data: [
      {
        aid: '3800a06d202d49178239281ea901c08f',
        resName: '首页',
        resCode: '4001',
        resType: 'nav',
        resParentId: null,
        resIcon: 'icon-home',
        resOrder: 1,
        resPath: '/home',
        resStatus: 1,
        resAppId: '8786cf8bcccd42e796259121c2858485',
        resCreateTime: 1641434617081,
        resCreateUser: '61806',
        child: [],
      },
      {
        aid: '499638fe397241ca809eb86f587ef4d0',
        resName: '系统管理',
        resCode: '4002',
        resType: 'nav',
        resParentId: null,
        resIcon: 'icon-mc-sys',
        resOrder: 99,
        resPath: '/sys',
        resStatus: 1,
        resAppId: '8786cf8bcccd42e796259121c2858485',
        resCreateTime: 1641434651343,
        resCreateUser: '61806',
        child: [
          {
            aid: 'eb5b24a7af554f17b8947732bf532472',
            resName: '字典配置',
            resCode: '4002002',
            resType: 'menu',
            resParentId: '499638fe397241ca809eb86f587ef4d0',
            resIcon: null,
            resOrder: 2,
            resPath: '/sys/dictionaryinfo',
            resStatus: 1,
            resAppId: '8786cf8bcccd42e796259121c2858485',
            resCreateTime: 1641451760304,
            resCreateUser: '60582',
            child: [],
          },
        ],
      },
    ],
    msg: null,
    success: true,
  });
});

module.exports = router;
