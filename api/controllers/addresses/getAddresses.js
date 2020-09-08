const { address: { getAddresses } } = require('../../sql');

module.exports = async(req, res) => {
  const { query } = req;
  const { routeId } = query;

  if (!routeId) {
    return res.json({ error: 'Not found route id in query params' });
  }

  const { error, addresses } = await getAddresses({ routeId });

  if (error) {
    return res.json({ error });
  }

  res.status(200).json({ result: addresses });
};
