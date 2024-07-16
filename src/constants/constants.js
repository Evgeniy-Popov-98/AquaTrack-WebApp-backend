// src\constants\constants.js
import path from 'path';
export const ENV_VARS = {
  PORT: 'PORT',
  MONGODB_USER: 'MONGODB_USER',
  MONGODB_PASSWORD: 'MONGODB_PASSWORD',
  MONGODB_URL: 'MONGODB_URL',
  MONGODB_DB: 'MONGODB_DB',
  FRONTEND_HOST: 'FRONTEND_HOST',
  BACKEND_HOST: 'BACKEND_HOST',
  JWT_SECRET: 'JWT_SECRET',
};

// export const TEMPLATES_DIR = path.join(process.cwd(), 'src', 'templates');
export const TEMPLATES_UPLOAD_DIR = path.join(
  process.cwd(),
  'src',
  'templates',
);
export const TEMP_UPLOAD_DIR = path.join(process.cwd(), 'temp');
export const UPLOAD_DIR = path.join(process.cwd(), 'uploads');

export const CLOUDINARY = {
  CLOUD_NAME: 'CLOUD_NAME',
  API_KEY: 'API_KEY',
  API_SECRET: 'API_SECRET',
  ENABLE_CLOUDINARY: 'ENABLE_CLOUDINARY',
  BACKEND_HOST: 'BACKEND_HOST',
};

export const ACCESS_TOKEN_LIFE_TIME = 15 * 60 * 1000;

export const REFRESH_TOKEN_LIFE_TIME = 30 * 24 * 60 * 60 * 1000;

export const SMTP = {
  SMTP_HOST: 'SMTP_HOST',
  SMTP_PORT: 'SMTP_PORT',
  SMTP_USER: 'SMTP_USER',
  SMTP_PASSWORD: 'SMTP_PASSWORD',
  SMTP_FROM: 'SMTP_FROM',
};

export const SWAGGER_PATH = path.join(process.cwd(), 'docs', 'swagger.json');
