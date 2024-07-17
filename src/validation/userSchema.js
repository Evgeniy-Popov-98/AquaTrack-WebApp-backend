import Joi from 'joi';

export const userSchema = Joi.object({
  // Валідація поля name
  name: Joi.string()
    .min(3) // Мінімальна довжина імені: 3 символи
    .max(30) // Максимальна довжина імені: 30 символів
    .messages({
      'string.min': 'Min string length is not achieved!', // Повідомлення про помилку, якщо довжина імені менше 3 символів
      'string.max': 'Maximum string length exceeded!', // Повідомлення про помилку, якщо довжина імені більше 30 символів
    }),
  // Валідація поля email
  email: Joi.string().email().messages({
    'string.email': 'Must be a valid email!', // Повідомлення про помилку, якщо введений не дійсний email
  }),
  // Валідація поля password
  password: Joi.string()
    .min(8) // Мінімальна довжина паролю: 8 символів
    .max(30) // Максимальна довжина паролю: 30 символів
    .messages({
      'string.min': 'Password must be at least 8 characters long!', // Повідомлення про помилку, якщо довжина паролю менше 8 символів
      'string.max': 'Password must be less than or equal to 30 characters long!', // Повідомлення про помилку, якщо довжина паролю більше 30 символів
    }),
  // Валідація поля gender
  gender: Joi.string().valid('male', 'female', 'other').messages({
    'any.only': 'Gender must be either male, female, or other!', // Повідомлення про помилку, якщо введене значення не є одним з дозволених варіантів
  }),
  // Валідація поля weight
  weight: Joi.number()
    .min(0) // Мінімальне значення ваги: 0
    .max(500) // Максимальне значення ваги: 500
    .messages({
      'number.min': 'Weight must be at least 0!', // Повідомлення про помилку, якщо вага менше 0
      'number.max': 'Weight must be less than or equal to 500!', // Повідомлення про помилку, якщо вага більше 500
    }),
  // Валідація поля activeSportsTime
  activeSportsTime: Joi.number()
    .min(0) // Мінімальне значення часу: 0
    .max(1440) // Максимальне значення часу: 1440 (24 години)
    .messages({
      'number.min': 'Active sports time must be at least 0 minutes!', // Повідомлення про помилку, якщо час менше 0
      'number.max': 'Active sports time must be less than or equal to 1440 minutes!', // Повідомлення про помилку, якщо час більше 1440
    }),
  // Валідація поля dailyWaterIntake
  dailyWaterIntake: Joi.number()
    .min(0) // Мінімальне значення води: 0
    .max(10000) // Максимальне значення води: 10000 мл
    .messages({
      'number.min': 'Daily water intake must be at least 0 ml!', // Повідомлення про помилку, якщо споживання води менше 0
      'number.max': 'Daily water intake must be less than or equal to 10000 ml!', // Повідомлення про помилку, якщо споживання води більше 10000
    }),
  // Валідація поля avatar
  avatar: Joi.string().uri().messages({
    'string.uri': 'Avatar must be a valid URL!', // Повідомлення про помилку, якщо введений не дійсний URL
  }),
});
