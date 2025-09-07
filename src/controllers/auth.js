import createHttpError from 'http-errors';
import {
  signupUser,
  verifyUser,
  signinUser,
  refreshUser,
  signoutUser,
  getGoogleLink,
  signupOrSigninWithGoogle,
} from '../services/auth.js';

const setupSession = (res, session) => {
  res.cookie('refreshToken', session.refreshToken, {
    httpOnly: true,
    expires: session.refreshTokenValidUntil,
  });

  res.cookie('sessionId', session._id, {
    httpOnly: true,
    expires: session.refreshTokenValidUntil,
  });
};

export const signupController = async (req, res) => {
  await signupUser(req.body);

  res.status(201).json({
    status: 201,
    message: 'Successfully register user',
  });
};

export const verifyController = async (req, res) => {
  const { token } = req.query;
  const user = await verifyUser(token);

  if (!user) {
    throw createHttpError(404, 'User not found');
  }

  res.redirect('https://github.com/t-matveentsev');
};

export const signinController = async (req, res) => {
  const session = await signinUser(req.body);

  setupSession(res, session);

  res.json({
    status: 200,
    message: 'Signin successfully',
    data: {
      accessToken: session.accessToken, //delete later
    },
  });
};

export const refreshController = async (req, res) => {
  const session = await refreshUser(req.cookies);

  setupSession(res, session);

  res.json({
    status: 200,
    message: 'Session successfully refresh',
    data: {
      accessToken: session.accessToken,
    },
  });
};

export const signoutController = async (req, res) => {
  if (req.cookies.sessionId) {
    await signoutUser(req.cookies.sessionId);
  }

  res.clearCookie('sessionId');
  res.clearCookie('refreshToken');

  res.status(204).send();
};

export const getGoogleOAuthLinkController = (req, res) => {
  const oauthLink = getGoogleLink();

  res.json({
    status: 200,
    message: 'Google OAuth link retrieved successfully',
    data: {
      link: oauthLink,
    },
  });
};

export const signupOrSigninGoogleController = async (req, res) => {
  const { code } = req.body;
  const session = await signupOrSigninWithGoogle(code);

  setupSession(res, session);

  res.json({
    status: 200,
    message: 'User logged in with google OAuth',
    data: { accessToken: session.accessToken },
  });
};
