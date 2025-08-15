import { getWineById, getWines } from '../services/wines.js';

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
