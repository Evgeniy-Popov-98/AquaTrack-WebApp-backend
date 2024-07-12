import express from 'express';
import 'dotenv/config';
import rootRouter from './routers/index.js';

import { env } from './utils/env.js';
import { ENV_VARS } from './constants/constants.js';

import { errorHandler } from './middleware/errorHandler.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';

export const setupServer = () => {
  const app = express();

  app.use(
    express.json({
      type: ['application/json', 'application/vnd.api+json'],
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
