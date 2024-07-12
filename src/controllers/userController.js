
import createHttpError from 'http-errors';
import { updateUserService } from '../servies/userService.js';


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
            const savedAvatar = await saveFile(req.file); // Зберігаємо аватар користувача
            avatarUrl = savedAvatar;
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
