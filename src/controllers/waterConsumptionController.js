
import { fetchDailyConsumptionService, fetchMonthlyConsumptionService } from '../services/waterConsumptionService.js';

export const fetchDailyConsumption = async (req, res) => {
  const date = req.params.date;

  try {
    const result = await fetchDailyConsumptionService(date);
    res.json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const fetchMonthlyConsumption = async (req, res) => {
  const month = req.params.month;

  try {
    const result = await fetchMonthlyConsumptionService(month);
    res.json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
