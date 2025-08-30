import { TypeCollection } from '../db/models/Type.js';

export const getTypes = async () => {
  return await TypeCollection.find();
};
