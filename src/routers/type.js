import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {
  addTypeController,
  getTypesController,
  deleteTypeController,
} from '../controllers/type.js';
import { validateBody } from '../utils/validateBody.js';
import { typeCreateSchema } from '../validation/type.js';
import { isValidId } from '../middlewares/isValidId.js';

const typesRouter = Router();

typesRouter.get('/', ctrlWrapper(getTypesController));
typesRouter.post(
  '/',
  validateBody(typeCreateSchema),
  ctrlWrapper(addTypeController),
);
typesRouter.delete('/:id', isValidId, ctrlWrapper(deleteTypeController));

export default typesRouter;
