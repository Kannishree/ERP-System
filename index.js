const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

// Import Routes
const authRoutes = require('./routes/auth');  
const productRoutes = require('./routes/product');  
const orderRoutes = require('./routes/orderRoutes'); 
const supplierRoutes = require('./routes/supplierRoutes');  
const adminRoutes = require('./routes/admin');  
const complianceRoutes = require("./routes/complianceRoutes");
//const employeeRoutes = require('./routes/employeeRoutes');  // ✅ Added Employee Routes

const app = express();

// ✅ Middleware
app.use(cors());
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));  
app.use(express.static('public'));  

// ✅ Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .catch(err => console.error('❌ MongoDB Connection Error:', err));

mongoose.connection.on('connected', () => console.log('✅ Connected to MongoDB Atlas'));
mongoose.connection.on('error', err => console.error('❌ MongoDB Error:', err));

// ✅ Default Route (Login Page)
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

// ✅ Serve Register & Login Pages
app.get('/login', (req, res) => res.sendFile(path.join(__dirname, 'public', 'login.html')));
app.get('/register', (req, res) => res.sendFile(path.join(__dirname, 'public', 'register.html')));

// ✅ API Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/suppliers', supplierRoutes);
app.use('/api/admin', adminRoutes);
app.use("/compliance", complianceRoutes);
//app.use('/api/employees', employeeRoutes);  // ✅ Added Employee API Routes

// ✅ 404 Not Found Middleware
app.use((req, res, next) => {
    res.status(404).json({ message: 'Route not found' });
});

// ✅ Global Error Handling
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!' });
});

// ✅ Start the Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
