import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import authRouter from './routers/auth.js';
import winesRouter from './routers/wines.js';
import typesRouter from './routers/type.js';
import varietalRouter from './routers/varietal.js';

import { notFoundHandler } from './middlewares/notFoundHandler.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { getEnvVar } from './utils/getEnvVar.js';
import { logger } from './middlewares/logger.js';
import { UPLOAD_FILE_DIR } from './constants/index.js';

export const setupServer = () => {
  const app = express();

  app.use(cors());
  app.use(cookieParser());
  app.use(express.json());
  app.use(logger);

  app.use('/auth', authRouter);
  app.use('/wines', winesRouter);
  app.use('/types', typesRouter);
  app.use('/varietals', varietalRouter);

  app.use('/upload', express.static(UPLOAD_FILE_DIR));

  app.use(notFoundHandler);
  app.use(errorHandler);

  const port = Number(getEnvVar('PORT', 8080));
  app.listen(port, () => console.log(`Server is running on port ${port}`));
};
