import fs from 'node:fs/promises';
import path from 'node:path';

import { ONE_DAY_MS, TEMPORARY_FILE_DIR } from '../constants/index.js';

export const cleanTempFolder = async () => {
  try {
    const files = await fs.readdir(TEMPORARY_FILE_DIR);

    if (files.length === 0) {
      console.log('The temp folder is empty.');
      return;
    }

    for (const file of files) {
      const filePath = path.join(TEMPORARY_FILE_DIR, file);
      await fs.unlink(filePath);
      console.log(`Deleted: ${file}`);
    }
  } catch (error) {
    console.error(`Something went wrong in process: ${error.message}`);
  }
};

const startCleaner = async () => {
  console.log('Start cleaning the folder...');
  await cleanTempFolder();

  setTimeout(startCleaner, ONE_DAY_MS);
};

startCleaner();
