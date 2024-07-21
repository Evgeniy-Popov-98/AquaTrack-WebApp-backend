import createHttpError from 'http-errors';
import User from '../db/models/User.js';
import { Session } from '../db/models/Session.js';

export const authenticate = async (req, res, next) => {
  console.log("auth middleware", req);
  try {
    // Отримуємо заголовок авторизації з запиту
    const authHeader = req.headers['authorization'];

    // Перевіряємо, чи існує заголовок авторизації
    if (!authHeader) {
      return next(createHttpError(401, 'Please provide Authorization header'));
    }

    // Розділяємо заголовок авторизації на тип токена та сам токен
    const bearer = authHeader.split(' ')[0];
    const token = authHeader && authHeader.split(' ')[1];

    // Перевіряємо, чи заголовок має тип Bearer та чи токен існує
    if (bearer !== 'Bearer' || !token) {
      return next(
        createHttpError(
          401,
          'There is no access token or the authentication header must be of type Bearer.',
        ),
      );
    }

    // Знаходимо сесію за accessToken
    const session = await Session.findOne({ accessToken: token });
    if (!session) {
      return next(createHttpError(401, 'Session not found'));
    }

    // Перевіряємо, чи не минув термін дії accessToken
    const isAccessTokenExpired =
      new Date() > new Date(session.accessTokenValidUntil);
    if (isAccessTokenExpired) {
      return next(createHttpError(401, 'Access token expired'));
    }

    // Знаходимо користувача за ID з сесії
    const user = await User.findById(session.userId);
    if (!user) {
      return next(
        createHttpError(401, 'User associated with this session is not found'),
      );
    }

    // Додаємо користувача до об'єкта запиту
    req.user = user;

    // Передаємо управління наступному middleware
    next();
  } catch (error) {
    // Логування помилки на сервері
    console.error('Error in authenticate middleware:', error);

    // Передаємо помилку обробнику помилок
    next(createHttpError(500, 'Internal Server Error'));
  }
};
