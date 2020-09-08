const { Pool } = require('pg');
const { DB } = require('../config');

const pool = new Pool({
  database: DB.NAME,
  user: DB.USER,
  password: DB.PASSWORD,
  host: DB.HOST,
  port: DB.PORT
});

const oldPoolQuery = pool.query;
pool.query = (...args) => {
  if (args && args[0]) {
    console.log(`\n\nQUERY: \n\t${args[0]}\n`);
  }
  return oldPoolQuery.apply(pool, args);
};

const testConnection = async() => {
  try {
    await pool.connect();
    const query = 'SELECT 1+1 test_query';
    console.log('TEST QUERY: ', query);
    const { rows } = await pool.query(query);
    if (!rows) {
      return console.error('Database connection failed. Error message: Test query filed');
    }
    console.log('TEST QUERY RESULT: ', (rows[0] && rows[0].test_query) || null);
    console.log('Connection to data base success');
  } catch (error) {
    console.error('Database connection failed. Error message: ' + error);
  }
};

module.exports = {
  testConnection,
  pool
};
