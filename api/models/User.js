const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize');

const User = sequelize.define('User', {
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    unique: true
  },
  name: { type: DataTypes.STRING },
  surname: { type: DataTypes.STRING },
  lastname: { type: DataTypes.STRING },
  password: { type: DataTypes.STRING },
  email: { type: DataTypes.STRING },
  phone: { type: DataTypes.STRING },
  deleted: { type: DataTypes.BOOLEAN, defaultValue: false },
  created_at: { defaultValue: DataTypes.NOW() },
  updated_at: { }
}, {
  tableName: 'users'
});

module.exports = User;
