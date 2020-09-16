const { pool } = require('../../db');

module.exports = async() => {
  const query = `
    select route_priority_id as id, name, brief
    from routes_priority
    order by route_priority_id
  `;

  try {
    const { rows } = await pool.query(query);

    return { routePriorityList: rows };
  } catch (error) {
    console.error(error);
    return { error: error.message };
  }
};
