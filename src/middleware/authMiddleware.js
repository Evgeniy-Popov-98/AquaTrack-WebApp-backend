import createHttpError from 'http-errors';
import User from '../db/models/User.js';
import jwt from 'jsonwebtoken';
const JWT_SECRET = 'your_jwt_secret';

export const authenticate = async (req, res, next) => {
  const authHeader = req.headers['authorization'];

  if (!authHeader) {
    next(createHttpError(401, 'Please provide Authorization header'));
    return;
  }

  const bearer = authHeader.split(' ')[0];
  const token = authHeader && authHeader.split(' ')[1];

  // Перевіряємо чи токен існує
  if (bearer !== 'Bearer' || !token) {
    return next(
      createHttpError(
        401,
        'There is no access token or the authentication header must be of type Bearer.',
      ),
    );
  }

  try {
    // Перевіряємо та декодуємо токен
    const decoded = jwt.verify(token, JWT_SECRET);

    // Отримуємо користувача за ID, який міститься у токені
    const user = await User.findById(decoded.userId);

    if (!user) {
      return next(createHttpError(404, 'User not found'));
    }

    req.user = user;

    next();
  } catch (error) {
    // Перехоплюємо помилки від jwt.verify
    if (error.name === 'TokenExpiredError') {
      return next(createHttpError(401, 'Access token expired'));
    } else {
      return next(createHttpError(401, 'Invalid access token'));
    }
  }
};
