// services\userServices.js
import User from '../models/User.js'; // Переконайтеся, що шлях відповідає вашій структурі проекту
import jwt from 'jsonwebtoken';

const JWT_SECRET = 'your_jwt_secret';

// Функція сервісу для отримання інформації про поточного користувача
export const getCurrentUserService = async (userId) => {
    try {
        console.log(`Отримуємо інформацію про користувача з id: ${userId}`);
        const user = await User.findById(userId).select('-password');
        console.log('Результат запиту до бази даних:', user);
        return user;
    } catch (error) {
        console.error('Помилка при отриманні інформації про користувача:', error);
        throw new Error('Користувача не знайдено або виникла помилка');
    }
};

// Функція для декодування токену і отримання userId
export const decodeToken = (token) => {
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        return decoded.userId;
    } catch (error) {
        console.error('Помилка декодування токену:', error);
        throw new Error('Неправильний токен або токен вийшов з ладу');
    }
};



export const refreshTokensService = (userId) => {
    const accessToken = jwt.sign({ userId }, JWT_SECRET, { expiresIn: '15m' });
    const refreshToken = jwt.sign({ userId }, JWT_SECRET, { expiresIn: '30d' });
    return { accessToken, refreshToken };
};

export const logoutUserService = async (userId) => {
    try {
        console.log(`Logging out user with id: ${userId}`);
        // Реалізуйте виход користувача тут, якщо потрібно
    } catch (error) {
        throw new Error('Error logging out user');
    }
};
