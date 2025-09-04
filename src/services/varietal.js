import { VarietalCollection } from '../db/models/Varietal.js';

export const getVarietals = async () => {
  return await VarietalCollection.find();
};

export const addVarietal = async (payload) => {
  return await VarietalCollection.create(payload);
};

export const deleteVarietalById = async (_id) =>
  VarietalCollection.findOneAndDelete({ _id });
