import fs from 'node:fs/promises';
import path from 'node:path';
import { env } from './env.js';
import { TEMPLATES_UPLOAD_DIR, UPLOAD_DIR } from '../constants/constants.js';

export const saveFileToLocalMachine = async (file) => {
  await fs.rename(
    path.join(TEMPLATES_UPLOAD_DIR, file.filename),
    path.join(UPLOAD_DIR, file.filename),
  );

  return `${env('APP_DOMAIN_PHOTO')}/uploads/${file.filename}`;
};
