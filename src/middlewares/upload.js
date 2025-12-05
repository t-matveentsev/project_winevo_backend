import multer from 'multer';
import fs from 'fs';
import { TEMPORARY_FILE_DIR } from '../constants/index.js';

if (!fs.existsSync(TEMPORARY_FILE_DIR)) {
  fs.mkdirSync(TEMPORARY_FILE_DIR, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, TEMPORARY_FILE_DIR);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, uniqueSuffix + '-' + file.originalname);
  },
});

export const upload = multer({ storage });
