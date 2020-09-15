const { base: { getBaseList } } = require('../../sql');

module.exports = async(req, res) => {
  const { user } = req;
  if (!user) return res.status(401).json({ error: 'User not found' });

  const { error, baseList } = await getBaseList({ userId: user.id });

  if (error) {
    return res.json({ error });
  }

  res.status(200).json({ result: baseList });
};
