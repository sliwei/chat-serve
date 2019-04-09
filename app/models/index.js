const {sequelize, Sequelize} = require('../utils/sequelize');

const bstu_room = require('./bstu_room');
const bstu_room_message = require('./bstu_room_message');
const bstu_user = require('./bstu_user');

const BstuRoom = bstu_room(sequelize, Sequelize);
const BstuRoomMessage = bstu_room_message(sequelize, Sequelize);
const BstuUser = bstu_user(sequelize, Sequelize);

/**
 * Associations - 关联
 * belongsTo BelongsTo 关联是在 source model 上存在一对一关系的外键的关联
 * HasOne HasOne 关联是在 target model 上存在一对一关系的外键的关联
 * hasMany 一对多关联将一个来源与多个目标连接起来。 而多个目标接到同一个特定的源
 * belongsToMany 多对多关联用于将源与多个目标相连接。 此外，目标也可以连接到多个源
 */

BstuRoomMessage.belongsTo(BstuUser, {as: 'user', foreignKey: 'u_id'}); // 聊天记录 -> 用户(评论人)

module.exports = {
  BstuRoom,
  BstuRoomMessage,
  BstuUser,
  sequelize,
  Sequelize,
};
