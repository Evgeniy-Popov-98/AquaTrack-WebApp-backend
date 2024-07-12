import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../middlewares/validateBody.js';
import {
  registerUserController,
  loginUserController,
} from '../controllers/authController.js';
import {
  getCurrentUserController,
  updateUserController,
  refreshTokensController,
  logoutUserController,
} from '../controllers/userController.js';
import { authenticate } from '../middleware/authMiddleware.js';
import { registerUserSchema } from '../validation/registerUserSchema.js';
import { loginUserSchema } from '../validation/loginUserSchema.js';
// import { upload } from '../middleware/update.js';

const router = Router();

router.post(
  '/register',
  validateBody(registerUserSchema),
  ctrlWrapper(registerUserController),
);
router.post(
  '/login',
  validateBody(loginUserSchema),
  ctrlWrapper(loginUserController),
);

router.get('/current', authenticate, ctrlWrapper(getCurrentUserController));
router.put(
  '/update',
  authenticate,
  //   upload.single('avatar'),
  ctrlWrapper(updateUserController),
);
router.post(
  '/refresh-tokens',
  authenticate,
  ctrlWrapper(refreshTokensController),
);
router.post('/logout', authenticate, ctrlWrapper(logoutUserController));

export default router;
