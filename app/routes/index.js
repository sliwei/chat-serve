const router = require('koa-router')();

// 数据校验
const parameter = require('../utils/parameter');
// token校验
const {checkToken} = require('../utils/tool/token');
// 验证码校验
const {checkCode} = require('../utils/tool/verification');

const {room_chat, chat_list} = require('../controllers/client/chat');
const {get, post} = require('../controllers/test');
const {upload} = require('../controllers/common');
const {info, login, register} = require('../controllers/manage/login');
const {code} = require('../controllers/verification');
const {index} = require('../controllers/index');
const {fzf} = require('../controllers/fzf');

// client chat
router.get('/chat/client/chat/room_chat', checkToken, room_chat);
router.get('/chat/client/chat/chat_list', checkToken, chat_list);
// test
router.get('/chat/test/get', get);
router.post('/chat/test/post', post);
// common
router.post('/chat/common/upload', checkToken, upload);
// login
router.get('/chat/manage/login/info', checkToken, info);
router.post('/chat/manage/login/login', checkCode, parameter, login);
router.post('/chat/manage/login/register', checkCode, parameter, register);
// verification
router.get('/chat/verification/code', parameter, code);
// index
router.get('/', index);
// fzf
router.get('*', fzf);

module.exports = router;
