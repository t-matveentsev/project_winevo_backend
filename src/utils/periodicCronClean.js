import cron from 'node-cron';
import { cleanTempFolder } from './tempCleaner.js';

cron.schedule('0 0 * * *', async () => {
  console.log('Start cleaning the folder...');
  await cleanTempFolder();
});
