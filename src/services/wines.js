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

  if (filters.title) {
    wineQuery.where('title').equals(filters.title);
  }

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

  const [totalItems, docs] = await Promise.all([
    WineCollection.countDocuments(wineQuery.getQuery()),
    wineQuery
      .skip(skip)
      .limit(perPage)
      .sort({ [sortBy]: sortOrder === 'desc' ? -1 : 1 })
      .populate({ path: 'type', select: 'type' })
      .populate({ path: 'varietal', select: 'varietal' })
      .lean(),
  ]);

  const items = docs.map((item) => ({
    ...item,
    type: item.type.type,
    varietal: Array.isArray(item.varietal)
      ? item.varietal.map((v) => v.varietal)
      : [],
  }));

  const paginationData = calcPaginationData({ page, perPage, totalItems });

  return {
    items,
    totalItems,
    ...paginationData,
  };
};

export const getWineById = async (id) => {
  const item = await WineCollection.findById(id)
    .populate({ path: 'type', select: 'type' })
    .populate({ path: 'varietal', select: 'varietal' })
    .lean();

  if (!item) return null;

  return {
    ...item,
    type: item.type.type,
    varietal: Array.isArray(item.varietal)
      ? item.varietal.map((v) => v.varietal)
      : [],
  };
};

export const addWine = async (payload) => await WineCollection.create(payload);

export const updateWine = async (_id, payload, options = {}) => {
  const { upsert = false } = options;
  const rawResult = await WineCollection.findByIdAndUpdate(_id, payload, {
    upsert,
    includeResultMetadata: true,
  });

  if (!rawResult || !rawResult.value) return null;

  return {
    data: rawResult.value,
    isNew: Boolean(rawResult.lastErrorObject.upserted),
  };
};

export const deleteWineById = async (_id) =>
  WineCollection.findOneAndDelete({ _id });
