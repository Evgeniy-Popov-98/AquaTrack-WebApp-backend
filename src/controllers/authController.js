import {
  registerUserService,
  loginUserService,
  resetPassword,
  sendResetPasswordEmail,
} from '../servies/authServices.js';
import { REFRESH_TOKEN_LIFE_TIME } from '../constants/constants.js';
import createHttpError from 'http-errors';

const setupSession = (res, session) => {
  res.cookie('sessionId', session._id, {
    httpOnly: true,
    expires: new Date(Date.now() + REFRESH_TOKEN_LIFE_TIME),
  });

  res.cookie('refreshToken', session.refreshToken, {
    httpOnly: true,
    expires: new Date(Date.now() + REFRESH_TOKEN_LIFE_TIME),
  });
};

export const registerUserController = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Перевірка наявності необхідних полів
    if (!email || !password) {
      throw createHttpError(
        400,
        'Email, password, and repeat password are required',
      );
    }

    const userData = await registerUserService({ email, password });

    res.status(201).json({
      status: 201,
      message: 'Successfully registered a user!',
      data: userData,
    });
  } catch (error) {
    next(error);
  }
};

export const loginUserController = async (req, res, next) => {
  const { email, password } = req.body;

  const session = await loginUserService({ email, password });

  setupSession(res, session);

  res.status(200).json({
    status: 200,
    message: 'Successfully logged in a user!',
    data: { accessToken: session.accessToken },
  });
};

export const sendResetPasswordEmailController = async (req, res) => {
  await sendResetPasswordEmail(req.body.email);

  res.json({
    status: 200,
    message: 'Reset password email was successfully sent!',
    data: {},
  });
};

export const resetPasswordController = async (req, res) => {
  await resetPassword(req.body);

  res.json({
    status: 200,
    message: 'Password was successfully reset!',
    data: {},
  });
};
