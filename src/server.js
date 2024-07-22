import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import rootRouter from './routers/index.js';
import { env } from './utils/env.js';
import { ENV_VARS } from './constants/constants.js';
import { notFoundHandler } from './middleware/notFoundHandler.js';
import { errorHandler } from './middleware/errorHandler.js';
import 'dotenv/config';

export const setupServer = () => {
  const app = express();
  app.use(express.json());

  app.use(
    cors({
      origin: 'http://localhost:5173',
      credentials: true,
    }),
  );

  app.use(cookieParser());

  app.use(
    express.json({
      type: ['application/json', 'application/vnd.api+json'],
      limit: '100kb',
    }),
  );
  app.use(
    cors({
      origin: 'http://localhost:5173',
      credentials: true,
    }),
  );

  app.use(
    express.json({
      type: ['application/json', 'application/vnd.api+json'],
      limit: '100kb',
    }),
  );

  app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    }),
  );

  app.use(rootRouter);

  app.use('*', notFoundHandler);
  app.use(errorHandler);

  const PORT = env(ENV_VARS.PORT, 3000);
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
