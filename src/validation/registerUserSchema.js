// src\validation\registerUserSchema.js
import Joi from 'joi';

export const registerUserSchema = Joi.object({
  // Валідація поля email
  email: Joi.string().email().required().messages({
    'any.required': '{{#label}} Is Required!', // Повідомлення про помилку, якщо поле обов'язкове
    'string.email': '{{#label}} Must be a valid email!', // Повідомлення про помилку, якщо введений не дійсний email
  }),
  // Валідація поля password
  password: Joi.string()
    .min(8) // Мінімальна довжина паролю: 8 символів
    .max(30) // Максимальна довжина паролю: 30 символів
    .required() // Поле обов'язкове
    .messages({
      'any.required': '{{#label}} Is Required!', // Повідомлення про помилку, якщо поле обов'язкове
      'string.min': '{{#label}} Must be at least 8 characters long!', // Повідомлення про помилку, якщо довжина паролю менше 8 символів
      'string.max': '{{#label}} Must be less than or equal to 30 characters long!', // Повідомлення про помилку, якщо довжина паролю більше 30 символів
    }),
  
  
});

// Валідація для запиту на скидання паролю
export const requestResetEmailSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'any.required': '{{#label}} Is Required!', // Повідомлення про помилку, якщо поле обов'язкове
    'string.email': '{{#label}} Must be a valid email!', // Повідомлення про помилку, якщо введений не дійсний email
  }),
});

// Валідація для скидання паролю
export const resetPasswordSchema = Joi.object({
  // Валідація поля password
  password: Joi.string()
    .min(8) // Мінімальна довжина паролю: 8 символів
    .max(30) // Максимальна довжина паролю: 30 символів
    .required() // Поле обов'язкове
    .messages({
      'any.required': '{{#label}} Is Required!', // Повідомлення про помилку, якщо поле обов'язкове
      'string.min': '{{#label}} Must be at least 8 characters long!', // Повідомлення про помилку, якщо довжина паролю менше 8 символів
      'string.max': '{{#label}} Must be less than or equal to 30 characters long!', // Повідомлення про помилку, якщо довжина паролю більше 30 символів
    }),
  // Валідація поля token
  token: Joi.string().required().messages({
    'any.required': '{{#label}} Is Required!', // Повідомлення про помилку, якщо поле обов'язкове
  }),
});
