import { TypeCollection } from '../db/models/Type.js';
import { capitalizeFirst } from '../utils/capitalizeFirst.js';

export const getTypes = async () => {
  return await TypeCollection.find().sort({ type: 1 });
};

export const addType = async (payload) => {
  payload.type = capitalizeFirst(payload.type);
  return await TypeCollection.create(payload);
};

export const deleteTypeById = async (_id) =>
  TypeCollection.findOneAndDelete({ _id });
