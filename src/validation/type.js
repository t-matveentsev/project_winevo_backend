import Joi from 'joi';

export const typeCreateSchema = Joi.object({
  type: Joi.string().required(),
});
