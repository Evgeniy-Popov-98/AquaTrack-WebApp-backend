import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const registerSchema = new mongoose.Schema({
  name: { type: String, require: true },
  email: { type: String, require: true, unique: true },
  password: { type: String, require: true },
});

registerSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

const registerUser = mongoose.model('user', registerSchema);

export default registerUser;
