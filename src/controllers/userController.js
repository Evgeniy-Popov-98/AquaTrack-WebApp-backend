import createHttpError from 'http-errors';
import { getUser, updateUserService } from '../servies/userService.js';
import {
  refreshSessionService,
  logoutUserService,
} from '../servies/authServices.js';
import { saveFile } from '../utils/cloudinary/saveFile.js';

export const getCurrentUserController = async (req, res, next) => {
  const userId = req.params;

  const user = await getUser(userId);

  if (!user) {
    throw createHttpError(404, { message: 'User not found' });
  }

  res.json({
    status: 200,
    message: 'Successfully found user!',
    data: user,
  });
};

export const updateUserController = async (req, res, next) => {
  const { body } = req;
  const userId = req.user._id; // Отримуємо userId поточного користувача з req.user._id

  try {
    let avatarUrl;
    if (req.file) {
      const avatarUrl = await saveFile(req.file); // Зберігаємо аватар користувача
      body.avatar = avatarUrl;
    }

    console.log('Received userId:', userId); // Логуємо userId для відстеження
    const updatedUser = await updateUserService(userId, body, avatarUrl); // Оновлюємо користувача через сервіс

    // Видаляємо чутливі поля з відповіді
    delete updatedUser.password;
    delete updatedUser.__v;

    res.status(200).json({
      status: 200,
      message: 'User updated successfully',
      data: updatedUser,
    });
  } catch (error) {
    next(error);
  }
};

export const refreshTokensController = async (req, res, next) => {
  const { refreshToken } = req.cookies;

  if (!refreshToken) {
    return next(createHttpError(400, 'Refresh token is required'));
  }

  try {
    const { newAccessToken, newRefreshToken } = await refreshSessionService(
      refreshToken,
    );

    res.cookie('refreshToken', newRefreshToken, {
      httpOnly: true,
      secure: true,
    });

    res.status(200).json({
      status: 200,
      message: 'Successfully refreshed a session!',
      data: { accessToken: newAccessToken },
    });
  } catch (error) {
    next(error);
  }
};

export const logoutUserController = async (req, res, next) => {
  const sessionId = req.cookies.sessionId;
  const refreshToken = req.cookies.refreshToken;

  //   if (!refreshToken) {
  //     return next(createHttpError(400, 'Refresh token is required'));
  //   }

  await logoutUserService({ sessionId, refreshToken });

  res.clearCookie('sessionId');
  res.clearCookie('refreshToken');

  res.status(204).send();
};
