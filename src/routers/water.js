import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../middlewares/validateBody.js';
import { createWaterSchema } from '../validation/water.js';
import { createWaterController } from '../controllers/water.js';

const router = Router();

router.post(
  '/',
  validateBody(createWaterSchema),
  ctrlWrapper(createWaterController),
);

export default router;
