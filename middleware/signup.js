module.exports = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).send({ message: 'Missing username or password' });
    }
    next();
  } catch (err) {
    return res.status(400).send({ message: 'Invalid entries. Try again.' });
  }
};
