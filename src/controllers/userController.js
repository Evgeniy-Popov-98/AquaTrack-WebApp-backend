import { getCurrentUserService, updateUserService, refreshTokensService, logoutUserService } from '../services/userService.js';

// controllers\userController.js
import createHttpError from 'http-errors';

// Контролер для отримання інформації про поточного користувача
export const getCurrentUserController = async (req, res, next) => {
    try {
        const { userId } = req.user;
        const user = await getCurrentUserService(userId);
        res.status(200).json(user);
    } catch (error) {
        next(createHttpError(500, error.message));
    }
};

// Контролер для оновлення інформації про користувача
export const updateUserController = async (req, res, next) => {
    try {
        const { userId } = req.user;
        const { body, file } = req;

        const updatedUser = await updateUserService(userId, body, file);

        res.status(200).json(updatedUser);
    } catch (error) {
        next(createHttpError(500, error.message));
    }
};

// Контролер для оновлення токенів
export const refreshTokensController = async (req, res, next) => {
    try {
        const { userId } = req.user;
        const tokens = refreshTokensService(userId);
        res.status(200).json(tokens);
    } catch (error) {
        next(createHttpError(500, error.message));
    }
};

// Контролер для виходу користувача
export const logoutUserController = async (req, res, next) => {
    try {
        const { userId } = req.user;
        await logoutUserService(userId);
        res.sendStatus(200);
    } catch (error) {
        next(createHttpError(500, error.message));
    }
};
