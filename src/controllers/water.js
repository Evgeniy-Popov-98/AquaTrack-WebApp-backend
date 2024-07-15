import { createWater, deleteWater, patchWater } from '../servies/water.js';
import createHttpError from 'http-errors';

export const createWaterController = async (req, res) => {
  const { body } = req;

  const water = await createWater(body, req.user._id);

  res.status(201).json({
    status: 201,
    message: 'Successfully created a record of the amount of water consumed!',
    data: water,
  });
};

export const patchWaterController = async (req, res, next) => {
  const {
    body,
    params: { idRecordWater },
    user: { _id: userId },
  } = req;

  const result = await patchWater(idRecordWater, body, userId);

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

export const deleteWaterController = async (req, res, next) => {
  const {
    params: { idRecordWater },
    user: { _id: userId },
  } = req;

  const water = await deleteWater(idRecordWater, userId);

  if (!water) {
    next(
      createHttpError(
        404,
        'The record about consumed amount of water not found',
      ),
    );
    return;
  }

  res.status(204).send();
};
