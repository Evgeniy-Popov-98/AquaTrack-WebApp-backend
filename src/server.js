// app.js

import express from 'express';
import 'dotenv/config';
import { errorHandler } from './middleware/errorHandler.js';
import userRoutes from './routers/userRoutes.js';

const setupServer = () => {
  const app = express();

  app.use(
    express.json({
      type: ['application/json', 'application/vnd.api+json'],
    })
  );

  // Ваші маршрути
  app.use('/users', userRoutes);

  // Підключення обробника помилок
  app.use(errorHandler);

  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
};

export { setupServer };
