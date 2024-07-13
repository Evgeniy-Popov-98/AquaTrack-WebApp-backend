import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const registerSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

// Додаткові налаштування, наприклад, хешування пароля перед збереженням
registerSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

const RegisterUser = mongoose.model('Users', registerSchema);

export default RegisterUser;
