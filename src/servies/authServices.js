import createHttpError from 'http-errors';
import registerUser from '../db/models/registerUser.js';
import { Session } from '../db/models/Session.js';
import User from '../db/models/User.js';
import bcrypt from 'bcrypt';
import { ENV_VARS, SMTP } from '../constants/constants.js';
import jwt from 'jsonwebtoken';
import {env} from '../utils/env.js';
import {TEMPLATES_UPLOAD_DIR} from '../constants/constants.js';
import fs from 'node:fs/promises';
import Handlebars from 'handlebars';
import path from 'node:path';
import { randomBytes } from 'crypto';
import {
  ACCESS_TOKEN_LIFE_TIME,
  REFRESH_TOKEN_LIFE_TIME,
} from '../constants/constants.js';
import { sendMail } from '../utils/sendMail.js';

const createSession = () => {
  return {
    accessToken: randomBytes(30).toString('base64'),
    refreshToken: randomBytes(30).toString('base64'),
    accessTokenValidUntil: new Date(Date.now() + ACCESS_TOKEN_LIFE_TIME),
    refreshTokenValidUntil: new Date(Date.now() + REFRESH_TOKEN_LIFE_TIME),
  };
};


export const registerUserService = async ({ email, password, repeatPassword }) => {
  const existingUser = await registerUser.findOne({ email });

  if (existingUser) {
    throw createHttpError(409, 'Email already in use');
  }

  if (password !== repeatPassword) {
    throw createHttpError(400, 'Passwords do not match');
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new registerUser({ email, password: hashedPassword });

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

export const refreshSessionService = async ({ sessionId, refreshToken }) => {
  const session = await Session.findOneAndDelete({ refreshToken });

  if (!session) throw createHttpError(401, 'Session not found');

  if (!session || session.refreshTokenValidUntil < new Date()) {
    throw createHttpError(401, 'Invalid or expired refresh token');
  }

  await Session.deleteOne({ _id: sessionId });

  return await Session.create({
    userId: session.userId,
    ...createSession(),
  });
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


export const sendResetPasswordEmail = async (email) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw createHttpError(404, 'User is not found!');
  }

  const token = jwt.sign(
    {
      sub: user._id,
      email,
    },
    env(ENV_VARS.JWT_SECRET),
    {
      expiresIn: '5m',
    },
  );

  try {
    const templateSource = await fs.readFile(
      path.join(TEMPLATES_UPLOAD_DIR, 'reset-password-email.html'),
    );

    const template = Handlebars.compile(templateSource.toString());

    const html = template({
      name: user.name,
      link: `${env(ENV_VARS.FRONTEND_HOST)}/reset-password?token=${token}`,
    });

    await sendMail({
      html,
      to: email,
      from: env(SMTP.SMTP_FROM),
      subject: 'Reset your password!',
    });
  } catch (err) {
    console.error('Error sending email:', err);
    throw createHttpError(500, 'Problem with sending emails');
  }
};


export const resetPassword = async ({ token, password }) => {
  let tokenPayload;
  try {
    tokenPayload = jwt.verify(token, env(ENV_VARS.JWT_SECRET));
  } catch (err) {
    throw createHttpError(401, err.message);
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await User.findOneAndUpdate(
    {
      _id: tokenPayload.sub,
      email: tokenPayload.email,
    },
    { password: hashedPassword },
  );
};
