import { Router } from 'express';
import {
  addWineController,
  deleteWineController,
  getWineByIdController,
  getWinesController,
} from '../controllers/wines.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { isValidId } from '../middlewares/isValidId.js';
import { validateBody } from '../utils/validateBody.js';
import { wineCreateSchema } from '../validation/wines.js';

const winesRouter = Router();

winesRouter.get('/', ctrlWrapper(getWinesController));

winesRouter.get('/:id', isValidId, ctrlWrapper(getWineByIdController));

winesRouter.post(
  '/',
  validateBody(wineCreateSchema),
  ctrlWrapper(addWineController),
);

wineCreateSchema.delete('/:id', isValidId, ctrlWrapper(deleteWineController));

export default winesRouter;
