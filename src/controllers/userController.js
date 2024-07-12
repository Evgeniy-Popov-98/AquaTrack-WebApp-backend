
import createHttpError from 'http-errors';
import { updateUserService } from '../servies/userService.js';
import {refreshSessionService, logoutUserService} from '../servies/authServices.js';
import { saveFile} from '../cloudinary/saveFile.js';
import User from '../db/models/User.js';

export const getCurrentUserController = (req, res, next) => {
    try {
        // Отримуємо користувача з об'єкта req, який був попередньо заповнений middleware authenticate
        const user = req.user;

        // Перевіряємо, що користувач знайдений
        if (!user) {
            throw createHttpError(401, 'User not authenticated');
        }

        // Створюємо новий об'єкт користувача без чутливих даних
        const sanitizedUser = {
            _id: user._id,
            name: user.name,
            email: user.email,
            gender: user.gender,
            weight: user.weight,
            activeSportsTime: user.activeSportsTime,
            dailyWaterIntake: user.dailyWaterIntake,
            avatar: user.avatar,
        };

        // Відправляємо користувача відповідь
        res.status(200).json({ user: sanitizedUser });
    } catch (error) {
        next(error);
    }
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
    console.log('refreshTokensController: початок обробки оновлення токенів');
  
    const { refreshToken } = req.body;
  
    if (!refreshToken) {
      return next(createHttpError(400, 'Токен оновлення відсутній'));
    }
  
    try {
      // Валідація та отримання ID з токену оновлення
      const userId = refreshSessionService(refreshToken);
  
      // Отримання користувача з бази даних за userId
      const user = await User.findById(userId);
  
      if (!user) {
        throw createHttpError(401, 'Користувача не знайдено');
      }
  
      // Оновлення токенів доступу та оновлення
      const { accessToken, newRefreshToken } = await refreshSessionService(userId);
  
      // Надсилання нових токенів у відповідь
      res.status(200).json({
        status: 200,
        message: 'Успішно оновлено сесію!',
        data: { accessToken, refreshToken: newRefreshToken },
      });
    } catch (error) {
      next(error);
    }
  };


export const logoutUserController = async (req, res) => {
    try {
        console.log('Запит на вихід користувача');
        const { refreshToken } = req.body; // Отримуємо refreshToken з тіла запиту
        console.log('Отриманий refreshToken для виходу:', refreshToken);
        
        await logoutUserService(refreshToken); // Викликаємо сервіс для виходу користувача

        res.status(200).json({ message: 'Користувач вийшов успішно' });
    } catch (error) {
        console.error('Помилка в контролері виходу користувача:', error);
        res.status(500).json({ message: 'Помилка при виході користувача' });
    }
};