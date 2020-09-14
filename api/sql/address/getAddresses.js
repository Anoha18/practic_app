const { pool } = require('../../db');

module.exports = async({ routeId }) => {
  const query = `
    select a.address_id as id, a.name,
      to_char(a.time_start, 'HH24:MI') time_start,
      to_char(a.time_end, 'HH24:MI') time_end,
      to_char(a.created_at, 'HH24:MI') created_time,
      to_char(a.created_at, 'DD.MM.YYYY') created_date,
      to_char(a.updated_at, 'HH24:MI') updated_time,
      to_char(a.updated_at, 'DD.MM.YYYY') updated_date,
      a.address,
      ap.name priority_name,
      a.price,
      a.weight,
      a.lat,
      a.lng
    from addresses a
    inner join addresses_priority ap on ap.address_priority_id = a.priority_id
    inner join addresses_type at on at.address_type_id = a.type_id
    where a.route_id = ${routeId}
    and a.deleted = false
    and at.brief = 'ADRES_MARSHRUTA'
  `;

  try {
    const { rows } = await pool.query(query);

    return { addresses: rows };
  } catch (error) {
    console.error(error);
    return { error: error.message };
  }
};
