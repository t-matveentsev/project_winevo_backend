import WineCollection from '../db/models/Wine.js';

export const getWines = async () => {
  const wines = await WineCollection.find();
  return wines;
};

export const getWineById = async (wineId) => {
  const wine = await WineCollection.findById(wineId);
  return wine;
};
