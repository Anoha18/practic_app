const { route: { getRoutes } } = require('../../sql');

module.exports = async (req, res) => {
  const { user } = req;
  if (!user) { return res.status(401).json({ error: 'User not found' }); }

  const { routes, error } = await getRoutes({ userId: user.id });

  if (error) {
    return res.status(500).json({ error });
  }

  res.status(200).json({ result: routes });
};
