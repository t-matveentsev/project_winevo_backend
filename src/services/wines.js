import { sortList } from '../constants/index.js';
import WineCollection from '../db/models/Wine.js';
import { calcPaginationData } from '../utils/calcPaginationData.js';

export const getWines = async ({
  page = 1,
  perPage = 10,
  sortBy = '_id',
  sortOrder = sortList[0],
  filters = {},
}) => {
  const skip = (page - 1) * perPage;
  const wineQuery = WineCollection.find();

  if (filters.winery) {
    wineQuery.where('winery').equals(filters.winery);
  }

  if (filters.country) {
    wineQuery.where('country').equals(filters.country);
  }

  if (filters.varietal) {
    wineQuery.where('varietal').equals(filters.varietal);
  }

  if (filters.type) {
    wineQuery.where('type').equals(filters.type);
  }

  const [totalItems, items] = await Promise.all([
    WineCollection.find().merge(wineQuery).countDocuments(),

    wineQuery
      .skip(skip)
      .limit(perPage)
      .sort({ [sortBy]: sortOrder })
      .exec(),
  ]);

  const paginationData = calcPaginationData({ page, perPage, totalItems });

  return {
    items,
    totalItems,
    ...paginationData,
  };
};

export const getWineById = async (id) => {
  const wine = await WineCollection.findOne({ _id: id });
  return wine;
};

export const addWine = async (payload) => WineCollection.create(payload);

export const deleteWineById = async (_id) =>
  WineCollection.findOneAndDelete({ _id });
