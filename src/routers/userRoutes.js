import express from 'express';
import { registerUser, loginUser } from '../controllers/authController.js';
import { getCurrentUserController, updateUserController, refreshTokensController, logoutUserController } from '../controllers/userController.js'; // Переконайтеся, що шлях відповідає вашій структурі проекту
import { authenticate } from '../middleware/authMiddleware.js';

const router = express.Router();

// Публічні ендпоінти
router.post('/register', registerUser);
router.post('/login', loginUser);

router.get('/current', authenticate, getCurrentUserController);
router.put('/update', authenticate, updateUserController);
router.post('/refresh-tokens', authenticate, refreshTokensController);
router.post('/logout', authenticate, logoutUserController);

export default router;
