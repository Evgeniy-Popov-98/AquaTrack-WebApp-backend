// src\db\models\registerUser.js

import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const registerSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
});

registerSchema.methods.comparePassword = async function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

const registerUser = mongoose.model('user', registerSchema);

export default registerUser;
