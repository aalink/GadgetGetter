const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Device extends Model {}

Device.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    device_type: {
      type: DataTypes.STRING,
    },
    device_serial_number: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    is_available: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'device',
  }
);

module.exports = Device;
