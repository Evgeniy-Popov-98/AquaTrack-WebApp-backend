
import { getDailyConsumption, getMonthlyConsumption } from '../db/WaterConsumptionData.js';
import { validateDate, validateMonth } from '../validation/waterConsumptionValidation.js';
import { formatResponse } from '../utils/formatResponse.js';

export const fetchDailyConsumptionService = async (date) => {
  if (!validateDate(date)) {
    throw new Error('Invalid date format');
  }

  const dailyConsumption = await getDailyConsumption(date);
  if (!dailyConsumption) {
    throw new Error('Data for the specified date was not found');
  }

  return formatResponse(date, dailyConsumption);
};

export const fetchMonthlyConsumptionService = async (month) => {
  if (!validateMonth(month)) {
    throw new Error('Invalid month format');
  }

  const monthlyConsumption = await getMonthlyConsumption(month);
  if (!monthlyConsumption) {
    throw new Error('Data for the specified month was not found');
  }

  return formatResponse(month, monthlyConsumption);
};
