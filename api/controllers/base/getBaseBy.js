const {
  base: { getBaseByRoute }
} = require('../../sql');

async function getByRouteId(req, res, routeId) {
  const { base, error } = await getBaseByRoute(routeId);
  if (error) { return res.json({ error }); }
  res.json({ result: base });
}

module.exports = async(req, res) => {
  const { query } = req;
  const keys = Object.keys(query);

  switch ((keys && keys[0]) || '') {
    case 'routeId':
      await getByRouteId(req, res, query.routeId);
      break;

    default:
      res.json({ result: null });
      break;
  }
};
