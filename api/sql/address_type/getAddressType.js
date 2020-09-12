const { pool } = require('../../db');

module.exports = async({ brief, name, addressTypeId }) => {
  const query = `
    select address_type_id id, name, brief, address_type_id from addresses_type
    where 1=1
    ${brief ? `and brief = '${brief}'` : ''}
    ${name ? `and name = '${name}'` : ''}
    ${addressTypeId ? `and address_type_id = ${addressTypeId}` : ''}
  `;

  try {
    const { rows } = await pool.query(query);
    return { addressesTypes: rows };
  } catch (error) {
    console.error(error);
    return { error: error.message };
  }
};
