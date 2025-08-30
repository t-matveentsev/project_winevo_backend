import { getVarietals } from '../services/varietal.js';

export const getVarietalsController = async (req, res) => {
  const varietals = await getVarietals();

  res.status(200).json({
    status: 200,
    message: 'Successfully find varietals',
    data: varietals,
  });
};
