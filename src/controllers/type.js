import createHttpError from 'http-errors';
import { addType, getTypes, deleteTypeById } from '../services/type.js';

export const getTypesController = async (req, res) => {
  const types = await getTypes();

  res.status(200).json({
    status: 200,
    message: 'Successfully find types',
    data: types,
  });
};

export const addTypeController = async (req, res) => {
  const types = await addType(req.body);

  res.status(200).json({
    status: 200,
    message: 'Successfully created new type',
    data: types,
  });
};

export const deleteTypeController = async (req, res) => {
  const { id } = req.params;
  const data = await deleteTypeById(id);

  if (!data) {
    throw createHttpError(404, `Type width id=${id}, not found`);
  }

  res.status(204).send();
};
