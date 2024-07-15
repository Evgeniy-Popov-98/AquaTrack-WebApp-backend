import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../middleware/validateBody.js';
import { createWaterSchema, updateWaterSchema } from '../validation/water.js';
import {
  createWaterController,
  deleteWaterController,
  patchWaterController,
} from '../controllers/water.js';
import { authenticate } from '../middleware/authMiddleware.js';

const router = Router();

router.use('/', authenticate);

router.post(
  '/',
  validateBody(createWaterSchema),
  ctrlWrapper(createWaterController),
);

router.patch(
  '/:idRecordWater',
  validateBody(updateWaterSchema),
  ctrlWrapper(patchWaterController),
);

router.delete('/:idRecordWater', ctrlWrapper(deleteWaterController));

export default router;
