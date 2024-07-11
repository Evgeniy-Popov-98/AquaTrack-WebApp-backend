import { WaterCollection } from '../db/models/water.js';

export const createWater = async (payload) => {
  const water = await WaterCollection.create(payload);
  return water;
};
