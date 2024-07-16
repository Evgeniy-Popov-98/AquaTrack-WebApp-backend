import {
  registerUserService,
  loginUserService,
  resetPassword,
  sendResetPasswordEmail,
  loginOrSignupWithGoogleOAuth,
} from '../servies/authServices.js';
import { generateOAuthURL } from '../utils/googleOAuth.js';
import { REFRESH_TOKEN_LIFE_TIME } from '../constants/constants.js';
import { validateGoogleOAuthSchema } from '../validation/validateGoogleOAuth.js';

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
  const { email, password } = req.body;

  const userData = await registerUserService({ email, password });

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


export const getOAuthUrlController = (req, res) => {
  const url = generateOAuthURL();

  res.json({
    status: 200,
    message: 'Successfully received oauth url!',
    data: {
      url,
    },
  });
};

export const verifyGoogleOAuthController = async (req, res, next) => {
  const { error } = validateGoogleOAuthSchema.validate(req.body);

  if (error) {
    return next(createHttpError(400, error.details[0].message));
  }

  const { code } = req.body;

  try {
    const session = await loginOrSignupWithGoogleOAuth(code);
    setupSession(res, session);

    res.json({
      status: 200,
      message: 'Logged in with Google OAuth!',
      data: { accessToken: session.accessToken },
    });
  } catch (error) {
    next(error);
  }
};