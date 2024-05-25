/**
 * 配置文件
 */
require('dotenv').config()

if (!process.env.ENV) {
  console.error('请设置环境变量ENV,MODE,DATABASE,USERNAME,PASSWORD,HOST,PORT')
}
const config = {
  mode: process.env.MODE, // development || production
  port: 3000, // 端口
  tokenObs: 'chat-serve', // token混淆码
  verificationObs: 'chat-serve', // 验证码混淆码
  verificationSta: true, // 启用验证码
  cookieOptions: {
    maxAge: 1000 * 3600 * 48,
    path: '/',
    httpOnly: false
  },
  env: process.env.ENV,
  api_url: {
    API_CORE: 'http://core-serve:3000'
  },
  db: {
    database: process.env.DATABASE,
    username: process.env.USERNAME,
    password: process.env.PASSWORD,
    conf: {
      host: process.env.HOST,
      port: process.env.PORT,
      dialect: 'mysql',
      pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
      },
      define: {
        insecureAuth: true,
        timestamps: false
      },
      timezone: '+08:00'
    }
  }
}

console.log('模式:', process.env.MODE)
console.log('环境:', process.env.ENV)
console.log('Listening on port: http://localhost:%d', config.port)

module.exports = config
