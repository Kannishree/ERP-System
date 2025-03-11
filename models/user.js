const mongoose = require('mongoose');

// User schema
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // ⚠️ Stored as plain text (Not recommended)
  role: { type: String, enum: ['admin', 'employee'], default: 'employee' }
});

// Compare password (Direct comparison without hashing)
userSchema.methods.comparePassword = async function (candidatePassword) {
  return this.password === candidatePassword;
};

const User = mongoose.model('User', userSchema);
module.exports = User;
