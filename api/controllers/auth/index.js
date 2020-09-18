const local = require('./local');
const logout = require('./logout');
const refreshToken = require('./refreshToken');
const createUser = require('./createUser');
const checkLogin = require('./checkLogin');

module.exports = {
  local,
  logout,
  refreshToken,
  createUser,
  checkLogin
};
