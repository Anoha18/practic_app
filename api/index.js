require('dotenv').config();
const express = require('express');
const app = express();
const { testConnection } = require('./db');
const middlewares = require('./middlewares');
// const port = process.env.SERVER_API_PORT || 3001;

testConnection();
middlewares(app);

module.exports = {
  path: '/api/',
  handler: app
}

// app.listen(port, () => {
//   console.log(`API server listening on port ${port}`);
// });
