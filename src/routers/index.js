import { Router } from 'express';
import waterRouter from './water.js';

const rootRouter = Router();

rootRouter.use('/water', waterRouter);

export default rootRouter;
