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
  try {
    const userId = req.user._id;
    const date = req.params.date;

    if (!date) {
      return res.status(400).json({ message: 'Date is required' });
    }

    const result = await fetchDailyService(userId, date);

    if (!result || result.length === 0) {
      return res.status(200).json({ dateOrMonth: date, data: [] }); // Повертає порожній масив, якщо даних немає
    }

    res.status(200).json(result);
  } catch (error) {
    console.error('Error fetching daily water data:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const fetchMonthlyController = async (req, res) => {
  const userId = req.user._id;
  const month = req.params.month;

  const result = await fetchMonthlyService(userId, month);

  res.status(200).json(result);
};
