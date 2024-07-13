import createHttpError from 'http-errors';

import {
  registerUserService,
  loginUserService,
} from '../servies/authServices.js';
import { REFRESH_TOKEN_LIFE_TIME } from '../constants/constants.js';

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
  const { name, email, password } = req.body;

  const userData = await registerUserService({ name, email, password });

  res.status(201).json({
    status: 201,
    message: 'Successfully registered a user!',
    data: userData,
  });
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
