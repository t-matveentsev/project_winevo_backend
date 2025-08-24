import WineCollection from '../db/models/Wine.js';

export const getWines = async () => {
  const wines = await WineCollection.find();
  return wines;
};

export const getWineById = async (id) => {
  const wine = await WineCollection.findOne({ _id: id });
  return wine;
};

export const addWine = async (payload) => WineCollection.create(payload);

export const deleteWineById = async (_id) =>
  WineCollection.findOneAndDelete({ _id });
