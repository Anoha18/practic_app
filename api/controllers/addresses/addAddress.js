const { address: { saveAddress } } = require('../../sql');

module.exports = async(req, res) => {
  const { body, user } = req;
  if (!body.address || !body.lat || !body.lng || !body.name) {
    return res.status(400).json({ error: 'Not all data delivered' });
  }

  const record = {
    name: body.name,
    lat: body.lat,
    lng: body.lng,
    address: body.address,
    comment: body.comment || null,
    time_start: body.timeStart || null,
    time_end: body.timeEnd || null,
    priority_id: body.priority || 1,
    weight: body.weight || null,
    price: body.price || null,
    route_id: body.routeId || null,
    creator_id: user.id
  };

  const { address, error } = await saveAddress(record);

  if (error) {
    return res.status(500).json({ error });
  }

  res.status(201).json({ result: address });
};
