// Learn more on how to config.
// - https://github.com/dora-js/dora-plugin-proxy#规则定义
module.exports = {
  'POST /bus/login.do': 'http://127.0.0.1:8080/BackGround',
  // 'GET /(.*\.do)': 'http://127.0.0.1:8080/BackGround/',//这个模式匹配有问题，会丢失BackGround后缀等待修复
  '/api/login': (req, res) => {
    setTimeout(() => {
      res.json({
        success: true,
        data: {
          user: 'admin'
        },
        message: '登录成功',
        code: 0
      });
    }, 500);
  },
  'GET /js/polyfill/ie8-polyfill.js': './static/js/polyfill/ie8-polyfill.js'
};
