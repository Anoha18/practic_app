const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize');
const User = require('./User');

const Route = sequelize.define('Route', {
  route_id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
    unique: true
  },
  name: {
    allowNull: true,
    type: DataTypes.STRING
  },
  description: {
    allowNull: true,
    type: DataTypes.STRING
  },
  date: {
    allowNull: true,
    type: DataTypes.DATE
  },
  time_start: {
    allowNull: true,
    type: DataTypes.TIME
  },
  time_end: {
    allowNull: true,
    type: DataTypes.TIME
  },
  created_at: { defaultValue: DataTypes.NOW() },
  updated_at: { },
  deleted: { type: DataTypes.BOOLEAN, defaultValue: false },
  creator_id: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: 'user_id'
    }
  }
}, {
  tableName: 'routes'
}
);

module.exports = Route;