// middleware/auth.js
const jwt = require('jsonwebtoken');
require('dotenv').config();

function authenticateToken(req, res, next) {
  const token = req.header('Authorization');
  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // decoded contains { id, role }
    next();
  } catch (error) {
    res.status(403).json({ message: 'Invalid token.' });
  }
}

function authorizeAdmin(req, res, next) {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Access forbidden: Admins only.' });
  }
  next();
}

module.exports = { authenticateToken, authorizeAdmin };
