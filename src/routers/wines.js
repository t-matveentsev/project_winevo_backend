import { Router } from 'express';
import {
  getWineByIdController,
  getWinesController,
} from '../controllers/wines.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { isValidId } from '../middlewares/isValidId.js';

const winesRouter = Router();

winesRouter.get('/', ctrlWrapper(getWinesController));

winesRouter.get('/:id', isValidId, ctrlWrapper(getWineByIdController));

export default winesRouter;
