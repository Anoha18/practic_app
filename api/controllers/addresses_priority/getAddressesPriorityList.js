const { address_priority: { getAddressesPriorityList } } = require('../../sql');

module.exports = async(req, res) => {
  const { error, addressesPriorityList } = await getAddressesPriorityList();

  if (error) {
    return res.status(500).json({ error });
  }

  return res.status(200).json({ result: addressesPriorityList });
};
