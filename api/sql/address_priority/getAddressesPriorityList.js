const { pool } = require('../../db');

module.exports = async() => {
  const query = `
    select
      ap.address_priority_id id,
      ap.address_priority_id,
      ap.name
    from addresses_priority ap
  `;

  try {
    const { rows } = await pool.query(query);
    return { addressesPriorityList: rows };
  } catch (error) {
    console.error(error);
    return { error: error.message };
  }
};
