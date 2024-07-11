// User.js (або як називається ваш файл моделі користувача)

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

const registerUser = mongoose.model('registerUser', registerSchema);

export default registerUser;
