import { WaterCollection } from '../db/models/water.js';
import { validateDate } from '../validation/dateValidation.js';
import { formatResponse } from '../utils/formatResponse.js';
import User from "../db/models/User.js";

export const createWater = async (userId, payload) => {
  const water = await WaterCollection.create({userId, ...payload});
  return water;
};

export const patchWater = async (userId, waterId, payload, options={}) => {
  const rawResult = await WaterCollection.findOneAndUpdate(
    {userId, _id: waterId},
    payload,
    { new: true, includeResultMetadata: true, ...options },
  );
  return rawResult;
};

export const deleteWater = async (userId, waterId) => {
  const water = await WaterCollection.findOneAndDelete({
    userId, _id: waterId,
  });
  return water;
};

export const fetchDailyService = async (userId, dateString) => {
  // Перевірка формату дати
  if (!validateDate(dateString)) {
    throw new Error('Invalid date format'); // Викидає помилку, якщо формат дати неправильний
  }

  // Розділяємо рік, місяць та день з дати
  const [year, month, day] = dateString.split('-');

  // Створення початкової дати дня
  const startDate = new Date(`${year}-${month}-${day}T00:00:00Z`);

  // Створення кінцевої дати дня
  const endDate = new Date(startDate);
  endDate.setUTCDate(endDate.getUTCDate() + 1);

  // Пошук даних про споживання води в зазначений день
  const dailyConsumption = await WaterCollection.find({
    userId,
    createdAt: {
      $gte: startDate, // Дата більше або дорівнює початковій даті
      $lt: endDate,    // Дата менше кінцевої дати
    },
  });

  // Перевірка, чи знайдені дані про споживання води
  if (!dailyConsumption || dailyConsumption.length === 0) {
    throw new Error('Data for the specified date was not found'); // Викидає помилку, якщо дані не знайдено
  }

  // Пошук користувача для отримання денної норми води
  const user = await User.findById(userId);

  if (!user) {
    throw new Error('User not found'); // Викидає помилку, якщо користувача не знайдено
  }

  // Обчислення загальної кількості спожитої води за день
  const totalConsumption = dailyConsumption.reduce((total, record) => total + record.amountOfWater, 0);

  // Обчислення відсотка спожитої води відносно денної норми
  const percentageOfDailyIntake = (totalConsumption / user.dailyWaterIntake) * 100;

  // Форматування і повернення відповіді
  const formattedResponse = formatResponse(dateString, dailyConsumption);
  return {
    ...formattedResponse,
    totalConsumption,
    percentageOfDailyIntake: percentageOfDailyIntake, // Відсоток з точністю до 2 знаків після коми
  };
};

export const fetchMonthlyService = async (userId, dateString) => {
  if (!validateDate(dateString)) {
    throw new Error('Invalid date format');
  }

  const [year, month] = dateString.split('-');
  const startDate = new Date(Date.UTC(year, month - 1, 1));
  const endDate = new Date(Date.UTC(year, month, 1));

  const monthlyConsumption = await WaterCollection.find({
    userId,
    createdAt: {
      $gte: startDate,
      $lt: endDate,
    },
  });

   if (!monthlyConsumption || monthlyConsumption.length === 0) {
    throw new Error('Data for the specified month was not found');
  }

  return formatResponse(dateString, monthlyConsumption);
};

// data {
//   [20, 50, 0, ]
// }
