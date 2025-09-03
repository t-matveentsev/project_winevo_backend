import fs from 'node:fs/promises';
import path from 'node:path';
import { TEMPORARY_FILE_DIR } from '../constants/index.js';
import { getEnvVar } from './getEnvVar.js';

export const cleanTempFolder = async () => {
  try {
    const files = await fs.readdir(getEnvVar(TEMPORARY_FILE_DIR));

    if (files.length === 0) {
      console.log('The temp folder is empty.');
      return;
    }

    for (const file of files) {
      const filePath = path.join(getEnvVar(TEMPORARY_FILE_DIR), file);
      const stats = await fs.stat(filePath);

      if (Date.now() - stats.mtimeMs > 24 * 3600000) {
        await fs.unlink(filePath);
      }
    }
  } catch (error) {
    console.error(`Something went wrong in process: ${error.message}`);
  }
};
