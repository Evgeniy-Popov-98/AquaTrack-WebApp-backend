import Joi from 'joi';

export const userSchema = Joi.object({
  name: Joi.string().min(3).max(30).messages({
    'string.min': 'Min string length is not achieved!',
    'string.max': 'Maximum string length exceeded!',
  }),
  email: Joi.string().email(),
  password: Joi.string(),
  gender: Joi.string(),
  weight: Joi.number(),
  activeSportsTime: Joi.number(),
  dailyWaterIntake: Joi.number(),
  avatar: Joi.string(),
});
