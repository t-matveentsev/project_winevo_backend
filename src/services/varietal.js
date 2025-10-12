import { VarietalCollection } from '../db/models/Varietal.js';
import { capitalizeFirst } from '../utils/capitalizeFirst.js';

export const getVarietals = async () => {
  return await VarietalCollection.find().sort({ varietal: 1 });
};

export const addVarietal = async (payload) => {
  payload.varietal = capitalizeFirst(payload.varietal);
  return await VarietalCollection.create(payload);
};

export const deleteVarietalById = async (_id) =>
  VarietalCollection.findOneAndDelete({ _id });
