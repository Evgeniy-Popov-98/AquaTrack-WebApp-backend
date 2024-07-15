import express from 'express';
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

  app.use(cors());
  app.use(cookieParser());
  app.use(express.json());

  app.use(rootRouter);

  app.use('*', notFoundHandler);
  app.use(errorHandler);

  const PORT = env(ENV_VARS.PORT, 3000);
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
