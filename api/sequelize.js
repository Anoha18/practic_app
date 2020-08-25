const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  dialect: 'postgres'
});

const testConnection = async() => {
  try {
    await sequelize.authenticate();
    console.log('Connection to data base success');
  } catch (error) {
    console.error('Database connection failed. Error message: ' + error);
  }

  sequelize.sync();
};

testConnection();

module.exports = sequelize;
