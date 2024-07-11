
import express from 'express';
import { fetchDailyConsumption, fetchMonthlyConsumption } from '../controllers/waterConsumptionController.js';

const router = express.Router();

router.get('/daily/:date', fetchDailyConsumption);
router.get('/monthly/:month', fetchMonthlyConsumption);

export default router;
