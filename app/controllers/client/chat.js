const {
  BstuRoom,
  BstuRoomMessage,
  BstuUser,
  Sequelize
} = require('../../models')
const Op = Sequelize.Op
/**
 * lw 单人聊天记录
 */
const room_chat = async (ctx, next) => {
  let rommName = ctx.query.rommName
  let backRommName = `${rommName.split('+')[1]}+${rommName.split('+')[0]}`
  let room = await BstuRoom.findAll({
    where: {
      [Op.or]: [{ name: rommName }, { name: backRommName }]
    },
    attributes: ['id']
  })
  let message = []
  if (room.length) {
    let ids = []
    room.map((item) => {
      ids.push(item.id)
    })
    message = await BstuRoomMessage.findAll({
      include: [
        { model: BstuUser, as: 'user', attributes: ['user', 'head_img'] }
      ],
      where: { r_id: { [Op.in]: ids } },
      attributes: [['cont', 'text'], 'create_time', 'type'],
      order: ['create_time']
    })
  }
  ctx.DATA.data = message
  ctx.body = ctx.DATA
}

/**
 * lw 聊天列表
 */
const chat_list = async (ctx, next) => {
  let user = ctx.res.USER
  let messIds = await BstuRoomMessage.findAll({
    where: { u_id: user.id },
    attributes: ['r_id']
  })
  let ids = []
  messIds.map((item) => {
    ids.indexOf(item) === -1 && ids.push(item.r_id)
  })
  let twoMessIds = await BstuRoomMessage.findAll({
    where: {
      r_id: { [Op.in]: ids },
      u_id: { [Op.not]: user.id }
    },
    attributes: ['u_id']
  })
  let twoIds = []
  twoMessIds.map((item) => {
    twoIds.indexOf(item) === -1 && twoIds.push(item.u_id)
  })
  let chat = await BstuUser.findAll({
    where: {
      id: { [Op.in]: twoIds }
    }
  })
  ctx.DATA.data = chat
  ctx.body = ctx.DATA
}

module.exports = {
  room_chat,
  chat_list
}
