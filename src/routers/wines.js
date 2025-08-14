import { Router } from 'express';
import {
  getWineByIdController,
  getWinesController,
} from '../controllers/wine.js';

const winesRouter = Router();

winesRouter.get('/', getWinesController);

winesRouter.get('/:id', getWineByIdController);

export default winesRouter;
