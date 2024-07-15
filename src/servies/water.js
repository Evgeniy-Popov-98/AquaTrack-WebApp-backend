import { WaterCollection } from '../db/models/water.js';
import {
  validateDate,
  // validateMonth,
} from '../validation/waterConsumptionValidation.js';
import { formatResponse } from '../utils/formatResponse.js';

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
  //   ).where({ userId });

  return rawResult;
};

export const deleteWater = async (userId, waterId) => {
  const water = await WaterCollection.findOneAndDelete({
    userId, _id: waterId,
  });
  return water;
};

export const fetchDailyService = async ( userId, date ) => {
  if (!validateDate(date)) {
    throw new Error('Invalid date format');
  }

  const startDate = new Date(`2024-07-${date.padStart(2, '0')}T00:00:00Z`);
const endDate = new Date(startDate);
endDate.setUTCDate(endDate.getUTCDate() + 1);

  const dailyConsumption = await WaterCollection.find({
    userId,
    createdAt:{
      $gte: startDate,
      $lt: endDate
    }
  });

  if (!dailyConsumption) {
    throw new Error('Data for the specified date was not found');
  }

  return formatResponse(date, dailyConsumption);
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
