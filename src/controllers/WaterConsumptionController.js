// Контроллеры для обработки запросов связанных с потреблением воды
import { getDailyConsumption, getMonthlyConsumption } from '../db/waterConsumptionData.js';
import { validateDate, validateMonth } from '../validation/waterConsumptionValidation.js';
import { formatResponse } from '../utils/formatResponse.js';

export const fetchDailyConsumption = async (req, res) => {
  const date = req.params.date;

  if (!validateDate(date)) {
    return res.status(400).json({ message: 'Неверный формат даты' });
  }

  const dailyConsumption = await getDailyConsumption(date);
  if (dailyConsumption !== undefined) {
    res.json(formatResponse(date, dailyConsumption));
  } else {
    res.status(404).json({ message: 'Данные за указанную дату не найдены' });
  }
};

export const fetchMonthlyConsumption = async (req, res) => {
  const month = req.params.month;

  if (!validateMonth(month)) {
    return res.status(400).json({ message: 'Неверный формат месяца' });
  }

  const monthlyConsumption = await getMonthlyConsumption(month);
  if (monthlyConsumption !== undefined) {
    res.json(formatResponse(month, monthlyConsumption));
  } else {
    res.status(404).json({ message: 'Данные за указанный месяц не найдены' });
  }
};
