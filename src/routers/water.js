import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../middleware/validateBody.js';
import { createWaterSchema, updateWaterSchema } from '../validation/water.js';
import {
  createWaterController,
  deleteWaterController,
  patchWaterController,
} from '../controllers/water.js';
import {
  fetchDailyController,
  fetchMonthlyController,
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

router.delete('/:idRecordWater', ctrlWrapper(deleteWaterController));

router.get('/daily/:date', ctrlWrapper(fetchDailyController));

router.get('/monthly/:month', ctrlWrapper(fetchMonthlyController));

export default router;
