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

export const createWater = async (payload) => {
  const water = await WaterCollection.create(payload);
  return water;
};

export const patchWater = async (idRecordWater, payload, options = {}) => {
  const rawResult = await WaterCollection.findOneAndUpdate(
    { _id: idRecordWater },
    payload,
    { new: true, includeResultMetadata: true, ...options },
  );

  if (!rawResult || !rawResult.value) return null;
  return {
    water: rawResult.value,
    isNew: Boolean(rawResult?.lastErrorObject?.upserted),
  };
};

export const deleteWater = async (idRecordWater) => {
  const water = await WaterCollection.findOneAndDelete({
    _id: idRecordWater,
  });
  return water;
};

export const fetchDailyService = async (date) => {
  if (!validateDate(date)) {
    throw new Error('Invalid date format');
  }

  const dailyConsumption = await getDailyConsumption(date);

  if (!dailyConsumption) {
    throw new Error('Data for the specified date was not found');
  }

  return formatResponse(date, dailyConsumption);
};

export const fetchMonthlyService = async (month) => {
  if (!validateMonth(month)) {
    throw new Error('Invalid month format');
  }

  const monthlyConsumption = await getMonthlyConsumption(month);
  if (!monthlyConsumption) {
    throw new Error('Data for the specified month was not found');
  }

  return formatResponse(month, monthlyConsumption);
};
