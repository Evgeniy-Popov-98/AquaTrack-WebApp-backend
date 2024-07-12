import mongoose from 'mongoose';

const { Schema } = mongoose;

const UserSchema = new Schema({
    _id: mongoose.Types.ObjectId, // Optional, MongoDB will auto-generate _id if not provided explicitly
    userId: {
        type: Schema.Types.ObjectId,
        default: mongoose.Types.ObjectId,
        index: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    gender: {
        type: String
    },
    weight: {
        type: Number
    },
    activeSportsTime: {
        type: Number
    },
    dailyWaterIntake: {
        type: Number
    },
    avatar: {
        type: String
    } ,
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
    }
);

const User = mongoose.model('User', UserSchema);

export default User;
