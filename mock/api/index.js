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

module.exports = router;
