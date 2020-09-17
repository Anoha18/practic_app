const { pool } = require('../../db');

module.exports = async({ refreshToken, userId, ip, closed, id }) => {
  const query = `
    select
      rt.refresh_token_id id,
      rt.refresh_token_id,
      rt.refresh_token,
      rt.user_id,
      to_char(rt.created_at, 'HH24:MI') created_time,
      to_char(rt.created_at, 'DD.MM.YYYY') created_date,
      to_char(rt.updated_at, 'HH24:MI') updated_time,
      to_char(rt.updated_at, 'DD.MM.YYYY') updated_date,
      rt.closed,
      rt.parent_id,
      rt.ip
    from refresh_tokens rt
    where 1=1
    ${refreshToken ? `and rt.refresh_token = '${refreshToken}'` : ''}
    ${userId ? `and rt.user_id = ${userId}` : ''}
    ${ip ? `and rt.ip = '${ip}'` : ''}
    ${typeof closed === 'boolean' ? `and rt.closed = ${closed}` : ''}
    ${id ? `and rt.refresh_token_id = ${id}` : ''}
    order by rt.created_at desc
  `;

  try {
    const { rows } = await pool.query(query);
    return { refreshTokens: rows };
  } catch (error) {
    console.error(error);
    return { error: error.message };
  }
};
