import Joi from 'joi';

export const registerUserSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'any.required': '{{#label}} Is Required!',
  }),
  password: Joi.string().required().messages({
    'any.required': '{{#label}} Is Required!',
  }),
  repeatPassword: Joi.string().valid(Joi.ref('password')).required().messages({
    'any.required': '{{#label}} Is Required!',
    'any.only': 'Passwords must match',
  }),
});



export const requestResetEmailSchema = Joi.object({
  email: Joi.string().email().required(),
});

export const resetPasswordSchema = Joi.object({
  password: Joi.string().required(),
  token: Joi.string().required(),
});