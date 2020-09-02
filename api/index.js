require('dotenv').config();
const express = require('express');
const app = express();
const { testConnection } = require('./db');
const middlewares = require('./middlewares');

testConnection();
middlewares(app);

module.exports = {
  path: '/api/',
  handler: app
}
