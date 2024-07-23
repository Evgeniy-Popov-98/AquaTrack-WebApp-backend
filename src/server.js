import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import rootRouter from './routers/index.js';
import { env } from './utils/env.js';
import { ENV_VARS, UPLOAD_DIR } from './constants/constants.js';
import { notFoundHandler } from './middleware/notFoundHandler.js';
import { errorHandler } from './middleware/errorHandler.js';

import 'dotenv/config';
import { swaggerDocs } from './middleware/swaggerDocs.js';

export const setupServer = () => {
  const app = express();

  app.use(cookieParser());

  app.use(
    express.json({
      type: ['application/json', 'application/vnd.api+json'],
      limit: '100kb',
    }),
  );

  app.use(
    cors({
      origin: 'https://aqua-track-web-app-frontend.vercel.app',
      //   origin: ' http://localhost:4000',
      credentials: true,
    }),
  );

   app.use(
     pino({
       transport: {
         target: 'pino-pretty',
       },
     }),
   );

  app.use('/uploads', express.static(UPLOAD_DIR));
  app.use('/api-docs', swaggerDocs());
  app.use(rootRouter);

  app.use('*', notFoundHandler);
  app.use(errorHandler);

  const PORT = env(ENV_VARS.PORT, 3000);
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
