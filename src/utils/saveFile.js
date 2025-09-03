import createHttpError from 'http-errors';
import { getEnvVar } from './getEnvVar.js';
import { saveToCloudinary } from './saveToCloudinary.js';

export const saveFile = async (file) => {
  const strategy = getEnvVar('SAVE_FILE_STRATEGY');
  switch (strategy) {
    case 'cloudinary':
      return await saveToCloudinary(file);
    default:
      throw createHttpError(500, `Unknown file saving strategy ${strategy}`);
  }
};
