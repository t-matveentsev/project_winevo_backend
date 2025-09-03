import fs from 'node:fs/promises';

import cloudinary from 'cloudinary';
import { getEnvVar } from './getEnvVar.js';
import createHttpError from 'http-errors';

cloudinary.config({
  cloud_name: getEnvVar('CLOUDINARY_CLOUD_NAME'),
  api_key: getEnvVar('CLOUDINARY_API_KEY'),
  api_secret: getEnvVar('CLOUDINARY_API_SECRET'),
});

export const saveToCloudinary = async (file) => {
  try {
    const response = await cloudinary.v2.uploader.upload(file.path);
    await fs.unlink(file.path);
    return response.secure_url;
  } catch (error) {
    throw createHttpError(409, `Failed to upload file: ${error.message}`);
  }
};
