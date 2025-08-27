import Joi from 'joi';
import { emailRegexp } from '../constants/auth.js';

export const authSignupSchema = Joi.object({
  username: Joi.string().min(2).max(15).required(),
  email: Joi.string().pattern(emailRegexp),
  password: Joi.string().min(6).max(30).required(),
});

export const authSigninSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp),
  password: Joi.string().min(6).max(30).required(),
});

export const googleOAuthSchema = Joi.object({
  code: Joi.string().required(),
});
