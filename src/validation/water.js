import Joi from 'joi';

export const createWaterSchema = Joi.object({
  amountOfWater: Joi.number().min(50).max(300).required().messages({
    'number.base': 'Amount of water should be a number',
    'number.min': 'Amount of water should have at least {#limit} ml',
    'number.max': 'Amount of water should have at most {#limit} ml',
    'any.required': '{#label} is required',
  }),
  date: Joi.string().required().messages({
    'any.required': 'Date is required',
  }),
});

export const updateWaterSchema = Joi.object({
  amountOfWater: Joi.number().min(50).max(300).messages({
    'number.min': 'Amount of water should have at least {#limit} ml',
    'number.max': 'Amount of water should have at most {#limit} ml',
  }),
});

export const dailyConsumptionSchema = Joi.object({
  date: Joi.string(),
  consumption: Joi.string(),
});

export const monthlyConsumptionSchema = Joi.object({
  month: Joi.string(),
  consumption: Joi.string(),
});
