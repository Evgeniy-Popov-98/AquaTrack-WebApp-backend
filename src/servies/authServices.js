import createHttpError from 'http-errors';
import registerUser from '../db/models/registerUser.js';
import { Session } from '../db/models/Session.js';
import User from '../db/models/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { createAccessToken,
  createRefreshToken,} from '../servies/jwtService.js';
  import { HttpError } from '../middleware/HttpError.js';
 
  

const JWT_SECRET = 'your_jwt_secret';
const JWT_ACCESS_EXPIRATION = '15m';
const JWT_REFRESH_EXPIRATION = '30d';

export const registerUserService = async ({ name, email, password }) => {
  const existingUser = await registerUser.findOne({ email });
  if (existingUser) {
    throw createHttpError(409, 'Email already in use');
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new registerUser({ name, email, password: hashedPassword });
  await newUser.save();

  const userData = newUser.toObject ? newUser.toObject() : newUser;
  delete userData.__v;
  delete userData.password;

  return userData;
};

export const loginUserService = async ({ email, password }) => {
  const user = await User.findOne({ email });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw createHttpError(401, 'Invalid email or password');
  }

  const accessToken = jwt.sign({ userId: user._id }, JWT_SECRET, {
    expiresIn: JWT_ACCESS_EXPIRATION,
  });
  const refreshToken = jwt.sign({ userId: user._id }, JWT_SECRET, {
    expiresIn: JWT_REFRESH_EXPIRATION,
  });

  console.log('Generated tokens:', { accessToken, refreshToken });

  // Перевірка існуючої сесії
  let session = await Session.findOne({ userId: user._id });
  if (session) {
    // Оновлення існуючої сесії
    session.accessToken = accessToken;
    session.refreshToken = refreshToken;
    session.accessTokenValidUntil = new Date(Date.now() + 15 * 60 * 1000); // 15 хвилин
    session.refreshTokenValidUntil = new Date(
      Date.now() + 30 * 24 * 60 * 60 * 1000,
    ); // 30 днів
  } else {
    // Видалення старої сесії, якщо вона існує
    await Session.findOneAndDelete({ userId: user._id });

    // Створення нової сесії
    session = new Session({
      userId: user._id,
      accessToken,
      refreshToken,
      accessTokenValidUntil: new Date(Date.now() + 15 * 60 * 1000), // 15 хвилин
      refreshTokenValidUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 днів
    });
  }

  await session.save();

  return { accessToken, refreshToken };
};
export const refreshSessionService = async (userId) => {
  try {
    // Створення нових токенів доступу та оновлення
    const newAccessToken = createAccessToken(userId);
    const newRefreshToken = createRefreshToken(userId);

    // Оновлення токенів у базі даних сесії користувача
    await Session.findOneAndUpdate(
      { userId },
      {
        accessToken: newAccessToken,
        refreshToken: newRefreshToken,
        accessTokenValidUntil: new Date(Date.now() + parseInt(process.env.JWT_ACC_EXPIRES_IN) * 1000),
        refreshTokenValidUntil: new Date(Date.now() + parseInt(process.env.JWT_REF_EXPIRES_IN) * 1000),
      },
      { upsert: true }
    );

    return { accessToken: newAccessToken, newRefreshToken };
  } catch (error) {
    console.error(error);
    throw new HttpError(500, 'Помилка під час оновлення токенів');
  }
};








export const logoutUserService = async (refreshToken) => {
  const session = await Session.findOneAndDelete({ refreshToken });

  if (!session) {
    throw createHttpError(401, 'Session not found');
  }
};
