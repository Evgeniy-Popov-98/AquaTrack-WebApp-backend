import { createWater } from '../services/water.js';

export const createWaterController = async (req, res) => {
  const { body } = req;

  const water = await createWater(body);

  res.status(201).json({
    status: 201,
    message: 'Successfully created a record of the amount of water consumed!',
    data: water,
  });
};
