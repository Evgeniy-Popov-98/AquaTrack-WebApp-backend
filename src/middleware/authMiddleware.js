// src\middleware\authMiddleware.js
import { Session } from '../db/models/Session.js';
import { tokenValidation } from '../servies/jwtService.js';

// Middleware для аутентифікації користувача за токеном доступу
export const authenticate = async (req, res, next) => {
  const { authorization } = req.headers;

  console.log('Authorization Header:', authorization);

  if (!authorization) {
    console.log('Authorization header is missing');
    return res.status(401).json({ message: 'Not authorized' });
  }

  const token = authorization.split(' ')[1];

  console.log('Extracted Token:', token);

  if (!token) {
    console.log('Access token is missing');
    return res.status(401).json({ message: 'Access token is missing' });
  }

  try {
    // Перевірка та отримання інформації з токену
    const userId = tokenValidation(token);

    console.log('Decoded User ID from Token:', userId);

    // Пошук сесії за userId
    const session = await Session.findOne({ userId });

    console.log('Found Session:', session);

    if (!session) {
      console.log('Session not found');
      throw new Error('Session not found');
    }

    // Додавання даних користувача до об'єкта запиту для подальшого використання
    req.user = {
      _id: session.userId,
      name: session.name, // Припустимо, що ім'я зберігається в сесійному сховищі
      email: session.email, // Припустимо, що email зберігається в сесійному сховищі
      // Додайте інші дані користувача, які вам потрібні
    };

    console.log('User added to request:', req.user);

    next();
  } catch (error) {
    console.error('Помилка в перевірці токена:', error.message);
    return res.status(401).json({ message: 'Invalid access token' });
  }
};
