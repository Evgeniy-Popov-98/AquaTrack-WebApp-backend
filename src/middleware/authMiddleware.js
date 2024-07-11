// authMiddleware.js


import { Session } from '../db/models/Session.js';
import { tokenValidation } from '../servies/jwtService.js';

export const authenticate = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ message: 'Not authorized' });
  }

  const token = authorization.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Access token is missing' });
  }

  try {
    // Ваша функція для перевірки та отримання інформації з токену
    const userId = tokenValidation(token);

    // Знайти сесію за userId
    const session = await Session.findOne({ userId });

    if (!session) {
      throw new Error('Session not found');
    }

    // Додати дані користувача до запиту
    req.user = {
      _id: session.userId,
      name: session.name, // Припустимо, що ім'я зберігається в сесійному сховищі
      email: session.email, // Припустимо, що email зберігається в сесійному сховищі
      // Додайте інші дані користувача, які вам потрібні
    };

    next();
  } catch (error) {
    console.error('Помилка в перевірці токена:', error.message);
    return res.status(401).json({ message: 'Invalid access token' });
  }
};
