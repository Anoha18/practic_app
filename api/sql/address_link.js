const { pool } = require('../db');

async function saveAddressLink({ addressId, objectId, linkTypeId, objectTypeId }) {
  const query = `
    insert into addresses_link(address_id, object_id, link_type_id, object_type_id)
    values($1, $2, $3, $4)
    returning *
  `;

  try {
    const { rows } = await pool.query(query, [addressId, objectId, linkTypeId, objectTypeId]);
    return {
      addressLink: (rows && rows[0]) || null
    };
  } catch (error) {
    console.error(error);
    return { error: error.message };
  }
};

module.exports = {
  saveAddressLink
};
