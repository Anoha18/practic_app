const { pool } = require('../../db');

const baseKeys = [
  'a.address_id id',
  'a.address_id',
  'a.name',
  'a.comment',
  'a.address',
  'a.lng',
  'a.lat',
  "to_char(a.created_at, 'HH24:MI') created_time",
  "to_char(a.created_at, 'DD.MM.YYYY') created_date",
  "to_char(a.updated_at, 'HH24:MI') updated_time",
  "to_char(a.updated_at, 'DD.MM.YYYY') updated_date"
];

module.exports = async ({ userId }) => {
  const query = `
    select
      ${baseKeys.join(',')}
    from addresses a
    inner join addresses_type at on at.address_type_id = a.type_id
    where a.creator_id = ${userId}
    and a.deleted = false
    and at.brief = 'BAZA'
  `;

  try {
    const { rows } = await pool.query(query);
    return { baseList: rows };
  } catch (error) {
    console.error(error);
    return { error: error.message };
  }
};
