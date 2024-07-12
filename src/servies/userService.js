import User from '../db/models/User.js';


export const updateUserService = async (userId, userData, avatarUrl) => {
    try {
        console.log('Received user data for update:', userData);

        // Перевірка, чи передано URL аватара і оновлення відповідно
        if (avatarUrl) {
            userData.avatar = avatarUrl;
        }

        // Оновлення користувача за userId
        const updatedUser = await User.findByIdAndUpdate(userId, userData, {
            new: true, // Повернути оновленого користувача
            runValidators: true // Запускати валідатори схеми
        });

        // Перевірка чи знайдено користувача
        if (!updatedUser) {
            console.error('User not found:', userId);
            throw new Error('User not found');
        }

        console.log('Updated user:', updatedUser);
        return {
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            gender: updatedUser.gender,
            weight: updatedUser.weight,
            activeSportsTime: updatedUser.activeSportsTime,
            dailyWaterIntake: updatedUser.dailyWaterIntake,
            avatar: updatedUser.avatar
        };
    } catch (error) {
        console.error('Error updating user:', error);
        throw new Error('Error updating user');
    }
};