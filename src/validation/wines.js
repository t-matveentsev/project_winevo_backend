import Joi from 'joi';

export const wineCreateSchema = Joi.object({
  type: Joi.string().required(),
  title: Joi.string().min(4).max(40).required(),
  country: Joi.string().min(4).max(15).required(),
  region: Joi.string().required(),
  winery: Joi.string().required(),
  varietal: Joi.array().items(Joi.string()).min(1).required(),
  year: Joi.string().min(4).max(4).required(),
  description: Joi.string().min(30).max(1000),
}).min(1);

export const wineUpdateSchema = Joi.object({
  type: Joi.string(),
  title: Joi.string().min(4).max(30),
  country: Joi.string().min(4).max(15),
  region: Joi.string(),
  winery: Joi.string(),
  varietal: Joi.array().items(Joi.string()).min(1),
  year: Joi.string().min(4).max(4),
  description: Joi.string().min(30).max(1000),
}).min(1);
