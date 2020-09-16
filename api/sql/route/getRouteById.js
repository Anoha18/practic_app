const { pool } = require('../../db');

const routeKey = [
  'r.route_id as id',
  'r.route_id',
  'r.priority_id',
  'r.name',
  'r.description',
  "to_char(r.date, 'DD.MM.YYYY') date",
  "to_char(r.time_start, 'HH24:MI') time_start",
  "to_char(r.time_end, 'HH24:MI') time_end",
  "to_char(r.created_at, 'HH24:MI') created_time",
  "to_char(r.created_at, 'DD.MM.YYYY') created_date",
  "to_char(r.updated_at, 'HH24:MI') updated_time",
  "to_char(r.updated_at, 'DD.MM.YYYY') updated_date",
  'r.deleted',
  'r.creator_id',
  'rp.name as priority_name',
  `(
    select count(*) address_count from addresses a
    inner join addresses_type at on at.address_type_id = a.type_id
    where a.route_id = r.route_id
    and a.deleted = false
    and at.brief = 'ADRES_MARSHRUTA'
  )`,
  `(
    select sum(a.price) total_price from addresses a
    inner join addresses_type at on at.address_type_id = a.type_id
    where a.route_id = r.route_id
    and a.deleted = false
    and at.brief = 'ADRES_MARSHRUTA'
  )
  `,
  `(
    select sum(a.weight) total_weight from addresses a
    inner join addresses_type at on at.address_type_id = a.type_id
    where a.route_id = r.route_id
    and a.deleted = false
    and at.brief = 'ADRES_MARSHRUTA'
  )
  `
];

module.exports = async({ routeId, userId }) => {
  const query = `
    select ${routeKey.join(',')},
      (
        select row_to_json(t) as user from (
          select
            u.user_id as id,
            u.name,
            u.lastname
          from users u
          where u.user_id= r.creator_id
        ) t
      )
    from routes r
    inner join routes_priority rp on rp.route_priority_id = r.priority_id
    where r.route_id = ${routeId}
    and r.deleted = false
    and r.creator_id = ${userId}
  `;

  try {
    const { rows } = await pool.query(query);

    return { route: (rows && rows[0]) || null };
  } catch (error) {
    console.error(error);
    return { error: error.message };
  }
};
