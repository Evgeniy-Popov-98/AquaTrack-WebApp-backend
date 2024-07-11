import jwt from 'jsonwebtoken';
import { HttpError } from '../middleware/HttpError'; // Підключаємо HttpError

const {
  ACCESS_SECRET,
  REFRESH_SECRET,
  JWT_ACC_EXPIRES_IN,
  JWT_REF_EXPIRES_IN,
} = process.env;

export const createAccessToken = id =>
  jwt.sign({ id }, ACCESS_SECRET, {
    expiresIn: JWT_ACC_EXPIRES_IN,
  });

export const createRefreshToken = id =>
  jwt.sign({ id }, REFRESH_SECRET, {
    expiresIn: JWT_REF_EXPIRES_IN,
  });

export const tokenValidation = accessToken => {
  if (!accessToken) throw new HttpError(401, 'Not authorized');

  try {
    const { id } = jwt.verify(accessToken, ACCESS_SECRET);
    return id;
  } catch (error) {
    throw new HttpError(401, 'Not authorized');
  }
};

export const refreshTokenValidation = refreshToken => {
  if (!refreshToken) throw new HttpError(403, 'Refresh token is missing');

  try {
    const { id } = jwt.verify(refreshToken, REFRESH_SECRET);
    return id;
  } catch (error) {
    throw new HttpError(403, 'Invalid refresh token');
  }
};
