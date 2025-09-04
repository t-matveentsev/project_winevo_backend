import Joi from 'joi';

export const varietalCreateSchema = Joi.object({
  varietal: Joi.string().required(),
});
