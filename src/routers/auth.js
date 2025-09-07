import { Router } from 'express';
import { validateBody } from '../utils/validateBody.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { authSigninSchema, authSignupSchema } from '../validation/auth.js';
import {
  signupController,
  verifyController,
  signinController,
  refreshController,
  signoutController,
} from '../controllers/auth.js';

const authRouter = Router();

authRouter.post(
  '/signup',
  validateBody(authSignupSchema),
  ctrlWrapper(signupController),
);

authRouter.get('/verify', ctrlWrapper(verifyController));

authRouter.post(
  '/signin',
  validateBody(authSigninSchema),
  ctrlWrapper(signinController),
);

authRouter.post('/refresh', ctrlWrapper(refreshController));

authRouter.post('/signout', ctrlWrapper(signoutController));

export default authRouter;
