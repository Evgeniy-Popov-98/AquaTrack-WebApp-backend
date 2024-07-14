import { Router } from 'express';
import waterRouter from './water.js';
import userRoutes from './userRoutes.js';

const rootRouter = Router();

rootRouter.use('/water', waterRouter);
rootRouter.use('/users', userRoutes);

export default rootRouter;
