import createHttpError from 'http-errors';
import {
  getVarietals,
  addVarietal,
  deleteVarietalById,
} from '../services/varietal.js';

export const getVarietalsController = async (req, res) => {
  const varietals = await getVarietals();

  res.status(200).json({
    status: 200,
    message: 'Successfully find varietals',
    data: varietals,
  });
};

export const addVarietalController = async (req, res) => {
  const varietals = await addVarietal(req.body);

  res.status(200).json({
    status: 200,
    message: 'Successfully created new varietal',
    data: varietals,
  });
};

export const deleteVarietalController = async (req, res) => {
  const { id } = req.params;
  const data = await deleteVarietalById(id);

  if (!data) {
    throw createHttpError(404, `Varietal width id=${id}, not found`);
  }

  res.status(204).send();
};
