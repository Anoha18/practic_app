const { route: { getRouteById } } = require('../../sql')

module.exports = async(req, res) => {
  const { params, user } = req;
  const { id } = params;

  if (!id || !+id) { return res.status(400).json({ error: 'Route id not found or not number' }); };

  const { route, error } = await getRouteById({ routeId: id, userId: user.id });

  if (error) {
    return res.status(500).json({ error });
  }

  res.status(200).json({ result: route });
};
