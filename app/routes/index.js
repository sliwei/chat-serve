const router = require('koa-router')()
const swaggerJsdoc = require('swagger-jsdoc')
const { join } = require('path')

const options = {
  definition: {
    openapi: '3.0.1',
    info: {
      description: '服务端',
      version: '1.0.0',
      title: '服务端'
    },
    host: '',
    basePath: '/',
    tags: [
      {
        name: 'server',
        description: 'auth'
      }
    ],
    schemes: ['http', 'https'],
    // components: {
    //   schemas: {
    //     Order: {
    //       type: 'object'
    //     }
    //   },
    //   securitySchemes: {
    //     BasicAuth: { type: 'http', scheme: 'basic' }
    //   }
    // }
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      }
    },
    security: [
      {
        bearerAuth: []
      }
    ]
  },
  apis: [join(__dirname, '../controllers/*.js')]
}
const openapiSpecification = swaggerJsdoc(options)
// 数据校验
const parameter = require('../utils/parameter')
// token校验
const { checkToken } = require('../utils/tool/token')
// 验证码校验
const { checkCode } = require('../utils/tool/verification')

const { room_chat, chat_list } = require('../controllers/client/chat')
const { get, post } = require('../controllers/test')
const { upload } = require('../controllers/common')
const { info, login, register } = require('../controllers/manage/login')
const { code } = require('../controllers/verification')
const { index } = require('../controllers/index')
const { fzf } = require('../controllers/fzf')

// client chat
router.get('/chat/client/chat/room_chat', checkToken, room_chat)
router.get('/chat/client/chat/chat_list', checkToken, chat_list)
// test
router.get('/chat/test/get', get)
router.post('/chat/test/post', post)
// common
router.post('/chat/common/upload', checkToken, upload)
// login
router.get('/chat/manage/login/info', checkToken, info)
router.post('/chat/manage/login/login', checkCode, parameter, login)
router.post('/chat/manage/login/register', checkCode, parameter, register)
// verification
router.get('/chat/verification/code', parameter, code)
// swagger
router.get('/chat/api/swagger.json', async function (ctx) {
  ctx.set('Content-Type', 'application/json')
  ctx.body = openapiSpecification
})
// index
router.get('/', index)
// fzf
router.get('*', fzf)

module.exports = router
