import { Router } from 'express';
import {
  addWineController,
  deleteWineController,
  getWineByIdController,
  getWinesController,
  patchWineController,
} from '../controllers/wines.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { isValidId } from '../middlewares/isValidId.js';
import { validateBody } from '../utils/validateBody.js';
import { wineCreateSchema, wineUpdateSchema } from '../validation/wines.js';
import { upload } from '../middlewares/upload.js';

const winesRouter = Router();

winesRouter.get('/', ctrlWrapper(getWinesController));

winesRouter.get('/:id', isValidId, ctrlWrapper(getWineByIdController));

winesRouter.post(
  '/',
  upload.single('thumb'),
  validateBody(wineCreateSchema),
  ctrlWrapper(addWineController),
);

winesRouter.patch(
  '/:id',
  isValidId,
  upload.single('thumb'),
  validateBody(wineUpdateSchema),
  ctrlWrapper(patchWineController),
);

winesRouter.delete('/:id', isValidId, ctrlWrapper(deleteWineController));

export default winesRouter;
