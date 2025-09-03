import { TypeCollection } from '../../db/models/Type.js';
import { VarietalCollection } from '../../db/models/Varietal.js';

export const parseWineFilterParams = async ({
  type,
  varietal,
  title,
  country,
  winery,
}) => {
  const [typeDoc, varietalDoc] = await Promise.all([
    type ? TypeCollection.findOne({ type }) : null,
    varietal ? VarietalCollection.findOne({ varietal }) : null,
  ]);

  return {
    type: typeDoc?._id,
    varietal: varietalDoc?._id,
    title: title || undefined,
    country: country || undefined,
    winery: winery || undefined,
  };
};
