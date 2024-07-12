import { WaterCollection } from '../db/models/water.js';

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
    contact: rawResult.value,
    isNew: Boolean(rawResult?.lastErrorObject?.upserted),
  };
};
