import Joi from 'joi';

export const wineCreateSchema = Joi.object({
  type: Joi.string().required(),
  title: Joi.string().min(4).max(40).required(),
  country: Joi.string().min(4).max(15).required(),
  region: Joi.string().required(),
  winery: Joi.string().required(),
  varietal: Joi.string().required(),
  year: Joi.number().min(1900).max(new Date().getFullYear()).required(),
  description: Joi.string().min(30).max(500),
}).min(1);

export const wineUpdateSchema = Joi.object({
  type: Joi.string(),
  title: Joi.string().min(4).max(30),
  country: Joi.string().min(4).max(15),
  region: Joi.string(),
  winery: Joi.string(),
  varietal: Joi.string(),
  year: Joi.number().min(1900).max(new Date().getFullYear()),
  description: Joi.string().min(30).max(500),
}).min(1);
