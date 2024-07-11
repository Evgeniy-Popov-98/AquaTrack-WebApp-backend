import mongoose from 'mongoose';

const { Schema } = mongoose;

const UserSchema = new Schema({
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
    }
});

const User = mongoose.model('User', UserSchema);

export default User;
