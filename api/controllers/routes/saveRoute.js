const { route: { saveRoute } } = require('../../sql')

module.exports = async(req, res) => {
  const { body, user } = req;
  if (!body) return res.status(400).json({ error: 'Not found request body' });

  if (!user) return res.status(401).json({ error: 'User not found' });

  const record = {
    name: body.name || null,
    date: body.date || null,
    description: body.description || null,
    priority_id: body.priorityId || 2,
    time_start: body.timeStart || null,
    time_end: body.timeEnd || null,
    creator_id: user.id
  }

  const { route, error } = await saveRoute(record);

  if (error) {
    return res.status(500).json({ error });
  }

  res.status(201).json({ result: route });
};
