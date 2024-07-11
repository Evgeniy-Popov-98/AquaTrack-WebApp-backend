
import dotenv from 'dotenv';

dotenv.config();

export const env = (key, defaultValue = '') => {
  return process.env[key] || defaultValue;
};
