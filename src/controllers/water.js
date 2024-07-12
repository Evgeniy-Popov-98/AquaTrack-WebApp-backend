import { createWater, patchWater } from '../services/water.js';
import createHttpError from 'http-errors';

export const createWaterController = async (req, res) => {
  const { body } = req;

  const water = await createWater(body);

  res.status(201).json({
    status: 201,
    message: 'Successfully created a record of the amount of water consumed!',
    data: water,
  });
};

export const patchWaterController = async (req, res, next) => {
  const { idRecordWater } = req.params;

  const result = await patchWater(idRecordWater, req.body);

  if (!result) {
    next(
      createHttpError(
        404,
        'The record about consumed amount of water not found',
      ),
    );
    return;
  }

  res.json({
    status: 200,
    message: `Successfully patched a record about consumed amount of water!`,
    data: result.water,
  });
};
