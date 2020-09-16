const { pool } = require('../../db');

module.exports = async(routeId) => {
  const query = `
    select
      a.address_id id,
      a.address_id,
      a.name,
      a.address,
      a.lat,
      a.lng,
      at.brief type_brief,
      at.name type_name,
      to_char(a.time_start, 'HH24:MI') time_start,
      to_char(a.time_end, 'HH24:MI') time_end,
      a.comment
    from addresses a
    inner join addresses_type at on at.address_type_id = a.type_id
    where at.brief = 'BAZA'
    and a.deleted = false
    and exists(
      select 1 from addresses_link al
      inner join link_type lt on lt.link_type_id = al.link_type_id
      inner join object_type ot on ot.object_type_id = al.object_type_id
      where lt.brief = 'BASE_ROUTE'
      and ot.brief = 'ROUTES'
      and al.object_id = ${routeId}
    )
  `;

  try {
    const { rows } = await pool.query(query);
    return { base: (rows && rows[0]) || null };
  } catch (error) {
    console.error(error);
    return { error: error.message };
  }
};
