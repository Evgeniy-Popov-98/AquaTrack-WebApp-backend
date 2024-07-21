import createHttpError from 'http-errors';
import { createWater, deleteWater, patchWater } from '../servies/water.js';
import { fetchDailyService, fetchMonthlyService } from '../servies/water.js';

export const createWaterController = async (req, res) => {
  const userId = req.user._id;
  const { body } = req;

  const water = await createWater(userId, body);

  res.status(201).json({
    status: 201,
    message: 'Successfully created a record of the amount of water consumed!',
    data: water,
  });
};

export const patchWaterController = async (req, res, next) => {
  const userId = req.user._id;
  const { idRecordWater } = req.params;

  const result = await patchWater(userId, idRecordWater, req.body);

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
    data: result.value,
  });
};

export const deleteWaterController = async (req, res, next) => {
  const userId = req.user._id;
  const { idRecordWater } = req.params;
  const water = await deleteWater(userId, idRecordWater);

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

export const fetchDailyController = async (req, res) => {
  const userId = req.user._id;
  const date = req.params.date;

  const result = await fetchDailyService(userId, date);

  res.status(200).json(result);
};

export const fetchMonthlyController = async (req, res) => {
  const userId = req.user._id;
  const month = req.params.month;

  const result = await fetchMonthlyService(userId, month);

  res.status(200).json(result);
};
