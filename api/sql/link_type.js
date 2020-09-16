const { pool } = require('../db');

async function getLinkTypeBy({ brief, id }) {
  const query = `
    select
      link_type_id id,
      link_type_id,
      name,
      brief
    from link_type
    where 1=1
    ${brief ? `and brief = '${brief}'` : ''}
    ${id ? `and id = ${id}` : ''}
  `;

  try {
    const { rows } = await pool.query(query);
    return {
      linkType: (rows && rows[0]) || null
    };
  } catch (error) {
    console.error(error);
    return { error: error.message };
  }
};

module.exports = {
  getLinkTypeBy
};
