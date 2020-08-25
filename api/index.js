require('dotenv').config();
const express = require('express');
const app = express();
const middlewares = require('./middlewares');
const sequelize = require('./sequelize');
const port = process.env.SERVER_PORT || 3001;

middlewares(app);

app.listen(port, () => {
  console.log(`API server listening on port ${port}`);
});
