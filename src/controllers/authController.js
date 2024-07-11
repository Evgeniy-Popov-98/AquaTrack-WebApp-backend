import createHttpError from 'http-errors';
import { registerUserService, loginUserService } from '../services/authServices.js';

// Реєстрація нового користувача
export const registerUser = async (req, res, next) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return next(createHttpError(400, 'Name, email, and password are required'));
  }

  try {
    const userData = await registerUserService({ name, email, password });

    res.status(201).json({
      status: 201,
      message: 'Successfully registered a user!',
      data: userData,
    });
  } catch (error) {
    next(error);
  }
};

// Логінізація користувача
export const loginUser = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(createHttpError(400, 'Email and password are required'));
  }

  try {
    const { accessToken } = await loginUserService({ email, password });

    res.status(200).json({
      status: 200,
      message: 'Successfully logged in a user!',
      data: { accessToken },
    });
  } catch (error) {
    next(error);
  }
};
