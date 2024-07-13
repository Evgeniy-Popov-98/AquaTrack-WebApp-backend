import createHttpError from 'http-errors';
import registerUser from '../db/models/registerUser.js';
import { Session } from '../db/models/Session.js';
import User from '../db/models/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { randomBytes } from 'crypto';
import {
  ACCESS_TOKEN_LIFE_TIME,
  REFRESH_TOKEN_LIFE_TIME,
} from '../constants/constants.js';

const createSession = () => {
  return {
    accessToken: randomBytes(30).toString('base64'),
    refreshToken: randomBytes(30).toString('base64'),
    accessTokenValidUntil: new Date(Date.now() + ACCESS_TOKEN_LIFE_TIME),
    refreshTokenValidUntil: new Date(Date.now() + REFRESH_TOKEN_LIFE_TIME),
  };
};

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

  const isEqual = await bcrypt.compare(password, user.password);

  if (!isEqual) {
    throw createHttpError(401, 'Unauthorized');
  }

  await Session.deleteOne({ userId: user._id });

  return await Session.create({
    userId: user._id,
    ...createSession(),
  });
};

export const refreshSessionService = async (refreshToken) => {
  const decoded = jwt.verify(refreshToken, JWT_SECRET);
  const session = await Session.findOneAndDelete({ refreshToken });

  if (!session || session.refreshTokenValidUntil < new Date()) {
    throw createHttpError(401, 'Invalid or expired refresh token');
  }

  const newAccessToken = jwt.sign({ userId: decoded.userId }, JWT_SECRET, {
    expiresIn: JWT_ACCESS_EXPIRATION,
  });
  const newRefreshToken = jwt.sign({ userId: decoded.userId }, JWT_SECRET, {
    expiresIn: JWT_REFRESH_EXPIRATION,
  });

  const newSession = new Session({
    userId: decoded.userId,
    accessToken: newAccessToken,
    refreshToken: newRefreshToken,
    accessTokenValidUntil: new Date(Date.now() + 15 * 60 * 1000), // 15 minutes
    refreshTokenValidUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
  });

  await newSession.save();

  return { newAccessToken, newRefreshToken };
};

export const logoutUserService = async ({ sessionId, refreshToken }) => {
  const session = await Session.findOneAndDelete({
    _id: sessionId,
    refreshToken,
  });

  if (!session) {
    throw createHttpError(401, 'Session not found');
  }
};
