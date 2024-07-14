import { WaterCollection } from '../db/models/water.js';

export const createWater = async (payload, userId) => {
  const water = await WaterCollection.create({ ...payload, userId: userId });
  return water;
};

export const patchWater = async (
  idRecordWater,
  { ...payload },
  userId,
  options = {},
) => {
  const rawResult = await WaterCollection.findOneAndUpdate(
    { _id: idRecordWater, userId },
    { ...payload },
    { new: true, includeResultMetadata: true, ...options },
  ).where({ userId });

  if (!rawResult || !rawResult.value) return null;
  return {
    water: rawResult.value,
    isNew: Boolean(rawResult?.lastErrorObject?.upserted),
  };
};

export const deleteWater = async (idRecordWater, userId) => {
  const water = await WaterCollection.findOneAndDelete({
    _id: idRecordWater,
    userId,
  });
  return water;
};
