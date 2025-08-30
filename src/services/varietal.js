import { VarietalCollection } from '../db/models/Varietal.js';

export const getVarietals = async () => {
  return await VarietalCollection.find();
};
