const jwt = require('jsonwebtoken');
require('dotenv/config');

const secret = process.env.SECRET;

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (!token) return res.status(401).send({ message: 'missing auth token' });
    const decoded = jwt.verify(token, secret);
    req.user = decoded.data;
    next();
  } catch (err) {
    return res.status(401).send({ message: 'jwt malformed' });
  }
};
