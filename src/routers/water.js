import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../middleware/validateBody.js';
import {
  createWaterSchema,
  dailyConsumptionSchema,
  monthlyConsumptionSchema,
  updateWaterSchema,
} from '../validation/water.js';
import {
  createWaterController,
  deleteWaterController,
  patchWaterController,
  fetchDailyController,
  fetchMonthlyController,
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

router.get(
  '/daily/:date',
  validateBody(dailyConsumptionSchema),
  ctrlWrapper(fetchDailyController),
);

router.get(
  '/monthly/:month',
  validateBody(monthlyConsumptionSchema),
  ctrlWrapper(fetchMonthlyController),
);

export default router;
