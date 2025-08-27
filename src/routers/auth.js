import { Router } from 'express';
import { validateBody } from '../utils/validateBody.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { authSignupSchema } from '../validation/auth.js';

const authRouter = Router();

authRouter.post('/signup', validateBody(authSignupSchema), ctrlWrapper);

export default authRouter;
