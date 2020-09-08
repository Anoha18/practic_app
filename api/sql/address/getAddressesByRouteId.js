const { pool } = require('../../db');

module.exports = async({ routeId }) => {
  const query = `
    select address_id as id, name,
      to_char(a.time_start, 'HH24:MI'),
      to_char(a.time_end, 'HH24:MI'),
      to_char(a.created_at, 'HH24:MI') created_time,
      to_char(a.created_at, 'DD.MM.YYYY') created_date,
      to_char(a.updated_at, 'HH24:MI') updated_time,
      to_char(a.updated_at, 'DD.MM.YYYY') updated_date,
      a.address,
      ap.name priority_name,
      a.price,
      a.weight
    from addresses a
    inner join addresses_priority ap on ap.address_priority_id = a.priority_id
    where a.route_id = ${routeId}
    a.deleted = false
  `;

  try {
    const { rows } = await pool.query(query);

    return { addresses: rows };
  } catch (error) {
    console.error(error);
    return { error: error.message };
  }
};
