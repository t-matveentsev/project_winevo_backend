import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import './utils/tempCleaner.js';

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

  app.use(cookieParser());
  app.use(express.json());
  app.use(
    cors({
      origin: 'https://winevo-collection.me',
      // origin: 'http://localhost:5173',
      // origin: 'prod front site',
      credentials: true,
      methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization'],
    }),
  );
  app.use(logger);

  app.use('/api/upload', express.static(UPLOAD_FILE_DIR));

  app.use('/api/auth', authRouter);
  app.use('/api/wines', winesRouter);
  app.use('/api/types', typesRouter);
  app.use('/api/varietals', varietalRouter);

  app.use(notFoundHandler);
  app.use(errorHandler);

  const port = Number(getEnvVar('PORT', 8080));
  app.listen(port, () => console.log(`Server is running on port ${port}`));
};
