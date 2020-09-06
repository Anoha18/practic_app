const { Pool } = require('pg');

const pool = new Pool({
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT
})

const oldPoolQuery = pool.query;
pool.query = (...args) => {
  console.log('QUERY:', args);
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
