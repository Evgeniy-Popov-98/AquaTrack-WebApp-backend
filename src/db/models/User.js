import { Schema, model } from 'mongoose';

const UserSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, require: true },
  name: {
    type: String,
    required: false,
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
    default: 1.5,
  },
  avatar: {
    type: String,
  },
});

const User = model('User', UserSchema);

export default User;
