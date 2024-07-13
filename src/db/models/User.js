import { Schema, model } from 'mongoose';

const UserSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, require: true },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
  },
  weight: {
    type: Number,
  },
  activeSportsTime: {
    type: Number,
  },
  dailyWaterIntake: {
    type: Number,
  },
  avatar: {
    type: String,
  },
  accessToken: {
    type: String,
    default: '',
  },
  refreshToken: {
    type: String,
    default: '',
  },
  verification: {
    type: Boolean,
    default: false,
  },
  verificationToken: {
    type: String,
  },
  resetPasswordToken: {
    type: String,
  },
});

const User = model('User', UserSchema);

export default User;
