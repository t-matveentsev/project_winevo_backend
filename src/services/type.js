import { TypeCollection } from '../db/models/Type.js';

export const getTypes = async () => {
  return await TypeCollection.find();
};

export const addType = async (payload) => {
  return await TypeCollection.create(payload);
};

export const deleteTypeById = async (_id) =>
  TypeCollection.findOneAndDelete({ _id });
