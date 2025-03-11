// routes/admin.js
const express = require('express');
const User = require('../models/user'); // Ensure your user model includes a 'role' field
const { authenticateToken, authorizeAdmin } = require('../middleware/auth');

const router = express.Router();

// Admin-only endpoint to create a new admin account (Without hashing)
router.post('/create-admin', authenticateToken, authorizeAdmin, async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    // ⚠️ Storing password as plain text (Insecure)
    const newAdmin = new User({ username, email, password, role: 'admin' });

    await newAdmin.save();
    res.status(201).json({ message: 'Admin registered successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
