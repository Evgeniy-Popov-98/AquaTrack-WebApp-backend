import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../middleware/validateBody.js';
import {
  registerUserController,
  loginUserController,
  sendResetPasswordEmailController,
  resetPasswordController,
  getOAuthUrlController,
  verifyGoogleOAuthController,
  getTotalUsers,
} from '../controllers/authController.js';
import {
  getFindtUserController,
  updateUserController,
  refreshTokensController,
  logoutUserController,
  getCurrentAccauntController,
} from '../controllers/userController.js';
import { authenticate } from '../middleware/authMiddleware.js';
import {
  registerUserSchema,
  requestResetEmailSchema,
  resetPasswordSchema,
} from '../validation/registerUserSchema.js';
import { loginUserSchema } from '../validation/loginUserSchema.js';
import { userSchema } from '../validation/userSchema.js';
import { upload } from '../middleware/update.js';
import { validateGoogleOAuthSchema } from '../validation/validateGoogleOAuth.js';

const router = Router();

router.get('/total-users', getTotalUsers);

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

router.get('/current', authenticate, ctrlWrapper(getCurrentAccauntController));

router.get('/:userId', ctrlWrapper(getFindtUserController));

router.patch(
  '/update',
  authenticate,
  validateBody(userSchema),
  upload.single('avatar'),
  ctrlWrapper(updateUserController),
);

router.post(
  '/refresh-tokens',
  authenticate,
  ctrlWrapper(refreshTokensController),
);

router.post('/logout', authenticate, ctrlWrapper(logoutUserController));

router.post(
  '/send-reset-email',
  validateBody(requestResetEmailSchema),
  ctrlWrapper(sendResetPasswordEmailController),
);

router.post(
  '/reset-password',
  validateBody(resetPasswordSchema),
  ctrlWrapper(resetPasswordController),
);

router.post('/get-oauth-url', ctrlWrapper(getOAuthUrlController));

router.post(
  '/verify-google-oauth',
  validateBody(validateGoogleOAuthSchema),
  ctrlWrapper(verifyGoogleOAuthController),
);
export default router;
