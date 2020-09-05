const { user } = require('../../sql');

module.exports = async (req, res) => {
  const { params } = req;
  if (!params) {
    return res.status(404).json({ error: 'Params query not found'});
  }

  const { id } = params;
  if (!id || !+id) {
    return res.status(404).json({error: 'User id not found'});
  }

  const { user: findUser, error } = await user.getUserById(id);

  if (error) {
    return res.status(404).json({ error });
  }

  res.status(200).json({ user: findUser });
};
