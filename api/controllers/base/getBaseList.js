const { base: { getBaseList } } = require('../../sql');

module.exports = async (req, res) => {
  const { query } = req;
  const { userId } = query;
  const { error, baseList } = await getBaseList({ userId });

  if (error) {
    return res.json({ error });
  }

  res.status(200).json({ result: baseList });
};
