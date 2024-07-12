import createHttpError from 'http-errors';
import {
  registerUserService,
  loginUserService,
} from '../servies/authServices.js';

// Реєстрація нового користувача
export const registerUserController = async (req, res, next) => {
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
    if (
      error.code === 11000 &&
      error.keyPattern &&
      error.keyPattern.email === 1
    ) {
      // Помилка дублювання email
      return res.status(409).json({
        message: 'Email already in use',
        error: error.message,
      });
    }
    // Інші типи помилок
    next(error);
  }
};

// Логінізація користувача
export const loginUserController = async (req, res, next) => {
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
