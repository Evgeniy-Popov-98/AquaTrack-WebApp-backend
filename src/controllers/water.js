import createHttpError from 'http-errors';
import { createWater, deleteWater, patchWater } from '../servies/water.js';
import { fetchDailyService, fetchMonthlyService } from '../servies/water.js';

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

export const deleteWaterController = async (req, res, next) => {
  const { idRecordWater } = req.params;
  const water = await deleteWater(idRecordWater);

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
  const date = req.params.date;

  const result = await fetchDailyService(date);

  res.json(result);
};

export const fetchMonthlyController = async (req, res) => {
  const month = req.params.month;

  const result = await fetchMonthlyService(month);

  res.json(result);
};
