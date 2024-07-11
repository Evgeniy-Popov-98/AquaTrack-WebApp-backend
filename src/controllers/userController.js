
import createHttpError from 'http-errors';
import { updateUserService, refreshTokensService, logoutUserService,decodeToken  } from '../services/userService.js';


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
            // Додавайте інші поля користувача, які вам потрібні
        };

        // Відправляємо користувача відповідь
        res.status(200).json({ user: sanitizedUser });
    } catch (error) {
        next(error);
    }
};
  
export const updateUserController = async (req, res) => {
    try {
        console.log('Запит на оновлення інформації про користувача');
        const userId = decodeToken(req.headers.authorization.split(' ')[1]);
        console.log('Отриманий userId з токену для оновлення:', userId);
        const userData = req.body;
        console.log('Отримані дані користувача для оновлення:', userData);
        const avatarFile = req.file;
        console.log('Отриманий файл аватару:', avatarFile);
        const updatedUser = await updateUserService(userId, userData, avatarFile);
        res.status(200).json(updatedUser);
    } catch (error) {
        console.error('Помилка в контролері оновлення інформації про користувача:', error);
        res.status(500).json({ message: 'Помилка при оновленні інформації про користувача' });
    }
};

// Контролер для оновлення токенів
export const refreshTokensController = async (req, res) => {
    try {
        console.log('Запит на оновлення токенів');
        const userId = decodeToken(req.headers.authorization.split(' ')[1]);
        console.log('Отриманий userId з токену для оновлення токенів:', userId);
        const tokens = refreshTokensService(userId);
        res.status(200).json(tokens);
    } catch (error) {
        console.error('Помилка в контролері оновлення токенів:', error);
        res.status(500).json({ message: 'Помилка при оновленні токенів' });
    }
};

// Контролер для виходу користувача
export const logoutUserController = async (req, res) => {
    try {
        console.log('Запит на вихід користувача');
        const userId = decodeToken(req.headers.authorization.split(' ')[1]);
        console.log('Отриманий userId з токену для виходу:', userId);
        await logoutUserService(userId);
        res.status(200).json({ message: 'Користувач вийшов успішно' });
    } catch (error) {
        console.error('Помилка в контролері виходу користувача:', error);
        res.status(500).json({ message: 'Помилка при виході користувача' });
    }
};
