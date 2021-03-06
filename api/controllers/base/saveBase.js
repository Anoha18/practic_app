const {
  address: { saveAddress },
  address_type: { getAddressType }
} = require('../../sql');

module.exports = async(req, res) => {
  const { body, user } = req;
  if (!body.address || !body.lat || !body.lng || !body.name) {
    return res.status(400).json({ error: 'Not all data delivered' });
  }

  if (!body.typeId) {
    const { addressesTypes, error } = await getAddressType({ brief: 'BAZA' });

    if (error) {
      return res.status(500).json({ error });
    }

    if (addressesTypes.length) {
      body.typeId = addressesTypes[0].id;
    }
  }

  const record = {
    name: body.name,
    lat: body.lat,
    lng: body.lng,
    address: body.address,
    comment: body.comment || null,
    time_start: body.timeStart || null,
    time_end: body.timeEnd || null,
    creator_id: user.id,
    type_id: body.typeId
  };

  const { address, error } = await saveAddress(record);

  if (error) {
    return res.status(500).json({ error });
  }

  res.status(201).json({ result: address });
};
