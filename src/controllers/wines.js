import createHttpError from 'http-errors';
import {
  addWine,
  deleteWineById,
  getWineById,
  getWines,
} from '../services/wines.js';

export const getWinesController = async (req, res) => {
  const data = await getWines();

  res.json({
    status: 200,
    message: 'Successfully find wines',
    data,
  });
};

export const getWineByIdController = async (req, res) => {
  const { id } = req.params;
  const data = await getWineById(id);

  res.json({
    status: 200,
    message: 'Successfully find wine',
    data,
  });
};

export const addWineController = async (req, res) => {
  const data = await addWine(req.body);

  res.status(201).json({
    status: 201,
    message: 'Successfully add wine',
    data,
  });
};

export const deleteWineController = async (req, res) => {
  const { id } = req.params;
  const data = await deleteWineById(id);

  if (!data) {
    throw createHttpError(404, `Wine width id=${id}, not found`);
  }

  res.status(204).send();
};
