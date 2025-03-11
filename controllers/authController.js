const jwt = require('jsonwebtoken');
const User = require('../models/user');
require('dotenv').config();

// 📌 Register a New User (⚠️ Without Hashing - Insecure)
exports.registerUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already registered' });
        }

        const newUser = new User({ username, email, password, role: 'employee' });

        await newUser.save();
        console.log(`✅ User registered: ${email}`);

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error("🚨 Registration error:", error);
        res.status(500).json({ message: 'Server error' });
    }
};

// 📌 User Login (⚠️ Direct Password Comparison - Insecure)
exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }

        console.log(`🔍 Login attempt for email: ${email}`);

        const user = await User.findOne({ email });
        if (!user) {
            console.log("❌ User not found:", email);
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        console.log(`✅ User found: ${user.email}`);

        // ⚠️ Direct password comparison (Should be hashed)
        if (user.password !== password) {
            console.log("❌ Incorrect password for:", email);
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        if (!process.env.JWT_SECRET) {
            console.log("❌ JWT_SECRET is missing in environment variables");
            return res.status(500).json({ message: 'Server error' });
        }

        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        console.log(`✅ Token generated for ${email}`);

        res.json({ message: 'Login successful', token, role: user.role });
    } catch (error) {
        console.error("🚨 Login error:", error);
        res.status(500).json({ message: 'Server error' });
    }
};
