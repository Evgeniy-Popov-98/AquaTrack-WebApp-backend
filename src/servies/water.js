import { WaterCollection } from '../db/models/water.js';
// import {
//   getDailyConsumption,
//   getMonthlyConsumption,
// } from '../db/WaterConsumptionData.js';
import {
  validateDate,
  validateMonth,
} from '../validation/waterConsumptionValidation.js';
import { formatResponse } from '../utils/formatResponse.js';

export const createWater = async (payload, userId) => {
  const water = await WaterCollection.create({ ...payload, userId: userId });
  return water;
};

export const patchWater = async (
  idRecordWater,
  payload,
  userId,
  options = {},
) => {
  const rawResult = await WaterCollection.findByIdAndUpdate(
    { _id: idRecordWater, userId },
    payload,
    { new: true, includeResultMetadata: true, ...options },
  );
  //   ).where({ userId });

  return rawResult;
};

export const deleteWater = async (idRecordWater, userId) => {
  const water = await WaterCollection.findByIdAndDelete({
    _id: idRecordWater,
    userId,
  });
  return water;
};

export const fetchDailyService = async (date) => {
  //   if (!validateDate(date)) {
  //     throw new Error('Invalid date format');
  //   }
  //   const dailyConsumption = await getDailyConsumption(date);
  //   if (!dailyConsumption) {
  //     throw new Error('Data for the specified date was not found');
  //   }
  //   return formatResponse(date, dailyConsumption);
};

export const fetchMonthlyService = async (month) => {
  //   if (!validateMonth(month)) {
  //     throw new Error('Invalid month format');
  //   }
  //   const monthlyConsumption = await getMonthlyConsumption(month);
  //   if (!monthlyConsumption) {
  //     throw new Error('Data for the specified month was not found');
  //   }
  //   return formatResponse(month, monthlyConsumption);
};
