import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {
  getVarietalsController,
  addVarietalController,
  deleteVarietalController,
} from '../controllers/varietal.js';
import { varietalCreateSchema } from '../validation/varietal.js';
import { validateBody } from '../utils/validateBody.js';
import { isValidId } from '../middlewares/isValidId.js';

const varietalRouter = Router();

varietalRouter.get('/', ctrlWrapper(getVarietalsController));
varietalRouter.post(
  '/',
  validateBody(varietalCreateSchema),
  ctrlWrapper(addVarietalController),
);
varietalRouter.delete('/:id', isValidId, ctrlWrapper(deleteVarietalController));

export default varietalRouter;
