import jwt from 'jsonwebtoken';
import createHttpError from 'http-errors';
import { getCurrentUserService, decodeToken } from '../services/userService.js'; // Змініть шлях до сервісу користувача на свій

const JWT_SECRET = 'your_jwt_secret';

// Функція для аутентифікації користувача за токеном
export const authenticate = async (req, res, next) => {
  // Отримуємо токен з заголовка Authorization
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  // Перевіряємо чи токен існує
  if (!token) {
    return next(createHttpError(401, 'Access token is missing'));
  }

  try {
    // Декодуємо токен і отримуємо userId
    const userId = decodeToken(token);

    // Отримуємо користувача за ID
    const user = await getCurrentUserService(userId);

    // Передаємо користувача до наступного middleware або обробника маршруту
    req.user = user;

    // Продовжуємо обробку запиту
    next();
  } catch (error) {
    // Перехоплюємо помилки декодування токену або отримання користувача
    return next(createHttpError(401, 'Invalid access token or user not found'));
  }
};

export default authenticate;
