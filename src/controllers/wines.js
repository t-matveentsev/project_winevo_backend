import createHttpError from 'http-errors';
import {
  deleteWineById,
  getWineById,
  getWines,
  updateWine,
} from '../services/wines.js';
import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { parseSortParams } from '../utils/parseSortParams.js';
import WineCollection, { wineSortFields } from '../db/models/Wine.js';
import { parseWineFilterParams } from '../utils/filters/parseWineFilterParams.js';
import { saveFile } from '../utils/saveFile.js';

export const getWinesController = async (req, res) => {
  const paginationParams = parsePaginationParams(req.query);
  const sortParams = parseSortParams(req.query, wineSortFields);
  const filters = await parseWineFilterParams(req.query);

  const data = await getWines({ ...paginationParams, ...sortParams, filters });

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
  let thumb = null;

  if (req.file) {
    try {
      thumb = await saveFile(req.file);
    } catch (error) {
      throw createHttpError(500, `Failed to upload file: ${error.message}`);
    }
  }

  const wineData = { ...req.body, thumb };
  const result = await WineCollection.create(wineData);

  res.status(201).json({
    status: 201,
    message: 'Successfully add wine',
    data: result,
  });
};

export const patchWineController = async (req, res) => {
  const { id } = req.params;
  let thumb = null;

  if (req.file) {
    thumb = await saveFile(req.file);
  }

  const result = await updateWine(id, { ...req.body, thumb });

  if (!result) {
    throw createHttpError(404, `Wine with id=${id} not found`);
  }

  res.json({
    status: 200,
    message: 'Successfully update wine',
    data: result.data,
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
