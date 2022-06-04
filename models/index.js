const User = require('./User');
const Device = require('./Device');

User.hasMany(Device, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Device.belongsTo(User, {
  foreignKey: 'user_id'
});

module.exports = { User, Device };
