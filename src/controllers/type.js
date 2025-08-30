import { getTypes } from '../services/type.js';

export const getTypesController = async (req, res) => {
  const types = await getTypes();

  res.status(200).json({
    status: 200,
    message: 'Successfully find types',
    data: types,
  });
};
