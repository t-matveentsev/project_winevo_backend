import { Router } from 'express';

import { validateBody } from '../utils/validateBody.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { authenticate } from '../middlewares/authenticate.js';

import {
  authSigninSchema,
  authSignupSchema,
  googleOAuthSchema,
} from '../validation/auth.js';

import {
  signupController,
  verifyController,
  signinController,
  refreshController,
  signoutController,
  getGoogleOAuthLinkController,
  signupOrSigninGoogleController,
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

authRouter.post('/refresh', authenticate, ctrlWrapper(refreshController));

authRouter.post('/signout', authenticate, ctrlWrapper(signoutController));

authRouter.post(
  '/get-google-oauth-link',
  ctrlWrapper(getGoogleOAuthLinkController),
);
authRouter.post(
  '/signin-with-google',
  validateBody(googleOAuthSchema),
  ctrlWrapper(signupOrSigninGoogleController),
);

export default authRouter;
