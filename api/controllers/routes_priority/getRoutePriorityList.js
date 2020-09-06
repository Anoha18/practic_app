const { routesPriority: { getRoutePriorityList } } = require('../../sql');

module.exports = async(req, res) => {
  const { error, routePriorityList } = await getRoutePriorityList();

  if (error) { return res.json({ error }); }

  res.json({ result: routePriorityList });
};
