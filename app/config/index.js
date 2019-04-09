/**
 * lw 配置文件
 */
const db = require('./mysql');

module.exports = {
  port: 3006, // 端口
  socket_port: 4000, // socket端口
  socket_safe: true, // socket 连接如果是https协议，则需要证书
  ssh_options: {      // https证书
    key: '/etc/letsencrypt/live/api.bstu.cn/privkey.pem',
    ca: '/etc/letsencrypt/live/api.bstu.cn/chain.pem',
    cert: '/etc/letsencrypt/live/api.bstu.cn/fullchain.pem'
  },
  db: db, // 数据库
  tokenObs: 'chat-serve', // token混淆码
  verificationObs: 'chat-serve', // 验证码混淆码
  verificationSta: true, // 启用验证码
  cookieOptions: {
    maxAge: 1000 * 3600 * 48,
    path: '/',
    httpOnly: false
  },
};
