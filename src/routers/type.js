import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { getTypesController } from '../controllers/type.js';

const typesRouter = Router();

typesRouter.get('/', ctrlWrapper(getTypesController));

export default typesRouter;
