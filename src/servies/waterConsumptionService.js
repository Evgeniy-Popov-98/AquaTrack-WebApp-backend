
import { getDailyConsumption, getMonthlyConsumption } from '../db/WaterConsumptionData.js';
import { validateDate, validateMonth } from '../validation/waterConsumptionValidation.js';
import { formatResponse } from '../utils/formatResponse.js';

export const fetchDailyConsumptionService = async (date) => {
  if (!validateDate(date)) {
    throw new Error('Неверный формат даты');
  }

  const dailyConsumption = await getDailyConsumption(date);
  if (!dailyConsumption) {
    throw new Error('Данные за указанную дату не найдены');
  }

  return formatResponse(date, dailyConsumption);
};

export const fetchMonthlyConsumptionService = async (month) => {
  if (!validateMonth(month)) {
    throw new Error('Неверный формат месяца');
  }

  const monthlyConsumption = await getMonthlyConsumption(month);
  if (!monthlyConsumption) {
    throw new Error('Данные за указанный месяц не найдены');
  }

  return formatResponse(month, monthlyConsumption);
};
