const {
  route: { saveRoute },
  link_type: { getLinkTypeBy },
  object_type: { getObjectTypeBy },
  address_link: { saveAddressLink }
} = require('../../sql');

async function saveBase(routeId, baseId) {
  const { linkType, error: linkTypeError } = await getLinkTypeBy({ brief: 'BASE_ROUTE' });
  const { objectType, error: objectTypeError } = await getObjectTypeBy({ brief: 'ROUTES' });

  if (linkTypeError || objectTypeError) { return { error: linkTypeError || objectTypeError }; }

  if (!objectType || !linkType) { return { error: 'Not found object type or link type' }; }

  const link = {
    addressId: baseId,
    objectId: routeId,
    objectTypeId: objectType.id,
    linkTypeId: linkType.id
  };
  const { addressLink, error: addressLinkError } = await saveAddressLink(link);

  if (addressLinkError) { return { error: addressLinkError }; }

  return { addressLink };
};

module.exports = async(req, res) => {
  const { body, user } = req;
  if (!body) return res.json({ error: 'Not found request body' });

  if (!user) return res.status(401).json({ error: 'User not found' });

  if (!body.baseId) return res.json({ error: 'Base not found' });

  const record = {
    name: body.name || null,
    date: body.date || null,
    description: body.description || null,
    priority_id: body.priorityId || 2,
    time_start: body.timeStart || null,
    time_end: body.timeEnd || null,
    creator_id: user.id
  };

  const { route, error } = await saveRoute(record);

  if (error) {
    return res.json({ error });
  }

  console.log('ROUUTE: ', route);
  const { addressLink, error: saveBaseError } = await saveBase(route.route_id, body.baseId);

  if (saveBaseError) { return res.json({ error: saveBaseError }); }

  res.status(201).json({ result: { ...route, ...{ base_link: addressLink } } });
};
