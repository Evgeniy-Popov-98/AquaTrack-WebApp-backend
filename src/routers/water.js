import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../middlewares/validateBody.js';
import { createWaterSchema, updateWaterSchema } from '../validation/water.js';
import {
  createWaterController,
  patchWaterController,
} from '../controllers/water.js';

const router = Router();

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

export default router;
