import User from '../db/models/User.js';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';

const JWT_SECRET = 'your_jwt_secret';

// Function to decode token and get user
export const decodeToken = (token) => {
    try {
        console.log('Received token:', token);
        const decoded = jwt.verify(token, JWT_SECRET);
        console.log('Decoded token:', decoded);
        return decoded;
    } catch (error) {
        console.error('Token decoding error:', error);
        throw new Error('Invalid token or token expired');
    }
};

// Service function to update user
export const updateUserService = async (userId, userData, avatarFile) => {
    try {
        console.log('Received userId for update:', userId);
        console.log('Received user data for update:', userData);

        if (avatarFile) {
            console.log('Received avatar file:', avatarFile);
        }

        if (!mongoose.isValidObjectId(userId)) {
            console.error('Invalid userId format:', userId);
            throw new Error('Invalid userId format');
        }

        let user = await User.findById(userId);

        console.log('Database query result:', user);

        if (!user) {
            console.error('User not found:', userId);
            throw new Error('User not found');
        }

        if (userData.name) user.name = userData.name;
        if (userData.email) user.email = userData.email;
        if (userData.gender) user.gender = userData.gender;
        if (userData.weight) user.weight = userData.weight;
        if (userData.activeSportsTime) user.activeSportsTime = userData.activeSportsTime;
        if (userData.dailyWaterIntake) user.dailyWaterIntake = userData.dailyWaterIntake;

        if (avatarFile) {
            try {
                user.avatar = avatarFile.path;
            } catch (error) {
                console.error('Error saving avatar:', error);
                throw new Error('Error saving avatar');
            }
        }

        await user.save();
        console.log('Updated user:', user);
        return user;
    } catch (error) {
        console.error('Error updating user:', error);
        throw new Error('Error updating user');
    }
};

// Other services that may be necessary for user management (e.g., token refresh, logout)

export const refreshTokensService = async (refreshToken) => {
    // Logic for token refresh
};

export const logoutUserService = async (refreshToken) => {
    // Logic for logging out
};
