const { pool } = require('../db');

async function getObjectTypeBy({ brief, id }) {
  const query = `
    select
      object_type_id id,
      object_type_id,
      name,
      brief,
      table_name
    from object_type
    where 1=1
    ${brief ? `and brief = '${brief}'` : ''}
    ${id ? `and id = ${id}` : ''}
  `;

  try {
    const { rows } = await pool.query(query);
    return {
      objectType: (rows && rows[0]) || null
    };
  } catch (error) {
    console.error(error);
    return { error: error.message };
  }
};

module.exports = {
  getObjectTypeBy
};
