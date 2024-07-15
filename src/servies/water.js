import { WaterCollection } from '../db/models/water.js';
import { validateDate } from '../validation/dateValidation.js';
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
  return rawResult;
};

export const deleteWater = async (userId, waterId) => {
  const water = await WaterCollection.findOneAndDelete({
    userId, _id: waterId,
  });
  return water;
};

export const fetchDailyService = async ( userId, dateString ) => {
  if (!validateDate(dateString)) {
    throw new Error('Invalid date format');
  }

const [year, month, day] = dateString.split('-');
const startDate = new Date(`${year}-${month}-${day}T00:00:00Z`);
const endDate = new Date(startDate);
endDate.setUTCDate(endDate.getUTCDate() + 1);

  const dailyConsumption = await WaterCollection.find({
    userId,
    createdAt:{
      $gte: startDate,
      $lt: endDate
    }
  });

  if (!dailyConsumption || dailyConsumption.length === 0) {
    throw new Error('Data for the specified date was not found');
  }

  return formatResponse(dateString, dailyConsumption);
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
