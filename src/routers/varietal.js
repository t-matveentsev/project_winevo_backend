import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { getVarietalsController } from '../controllers/varietal.js';

const varietalRouter = Router();

varietalRouter.get('/', ctrlWrapper(getVarietalsController));

export default varietalRouter;
