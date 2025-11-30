import createHttpError from 'http-errors';
import {
  signupUser,
  verifyUser,
  signinUser,
  refreshUser,
  signoutUser,
  getGoogleLink,
  signupOrSigninWithGoogle,
  getCurrentUser,
  getFavorites,
  addFavorite,
  removeFavorite,
} from '../services/auth.js';
import { getEnvVar } from '../utils/getEnvVar.js';

const setupSession = (res, session) => {
  res.cookie('refreshToken', session.refreshToken, {
    httpOnly: true,
    sameSite: 'none', //change 'lax' in 'none' for production
    secure: true, //change false in true
    expires: new Date(session.refreshTokenValidUntil),
  });

  res.cookie('sessionId', session._id, {
    httpOnly: true,
    sameSite: 'none', //change 'lax' in 'none'
    secure: true, //change false in true
    expires: new Date(session.refreshTokenValidUntil),
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

  res.redirect('https://winevo-collection.me/signin');
};

export const signinController = async (req, res) => {
  const session = await signinUser(req.body);
  const user = await getCurrentUser(session.userId);
  setupSession(res, session);

  res.status(200).json({
    status: 200,
    message: 'Signin successfully',
    accessToken: session.accessToken,
    user,
  });
};

export const currentUserController = async (req, res) => {
  const { _id } = req.user;
  const user = await getCurrentUser(_id);

  res.status(201).json({
    status: 201,
    message: 'Successfully find user',
    user,
  });
};

export const getFavoritesController = async (req, res) => {
  const { _id } = req.user;
  const favorites = await getFavorites(_id);

  res.json({
    status: 200,
    message: 'Successfully find favorites list',
    data: favorites,
  });
};

export const addFavoritesController = async (req, res) => {
  const { _id } = req.user;
  const { wineId } = req.params;

  const data = await addFavorite(_id, wineId);

  res.status(201).json({
    status: 201,
    message: 'Successfully added to favorites',
    data,
  });
};

export const deleteFavoritesController = async (req, res) => {
  const userId = req.user._id;
  const { wineId } = req.params;

  const data = await removeFavorite(userId, wineId);

  res.json({
    status: 200,
    message: 'Successfully deleted from favorites',
    data,
  });
};

export const refreshController = async (req, res) => {
  const session = await refreshUser(req.cookies);

  setupSession(res, session);

  res.json({
    status: 200,
    message: 'Session successfully refresh',
    accessToken: session.accessToken,
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
  const user = await getCurrentUser(session.userId);

  setupSession(res, session);

  res.json({
    status: 200,
    message: 'User logged in with google OAuth',
    data: {
      accessToken: session.accessToken,
      user: user,
    },
  });
};

export const googleAuthRedirectController = async (req, res, next) => {
  const { code } = req.query;

  if (!code) {
    throw createHttpError(400, 'Missing authorization code');
  }

  const session = await signupOrSigninWithGoogle(code);

  setupSession(res, session);

  res.redirect(`${getEnvVar('FRONTEND_URL')}`);
};
