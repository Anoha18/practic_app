module.exports = (req, res) => {
  res.clearCookie('access_token');
  res.clearCookie('refresh_token');
  res.json({ result: 'success' });
};
