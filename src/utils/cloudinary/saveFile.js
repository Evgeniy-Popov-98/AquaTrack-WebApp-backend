import { saveFileToLocalMachine } from '../saveFileToUploadDir.js';
import { saveFileToCloudinary } from './cloudinary.js';
import { env } from '../env.js';
import { CLOUDINARY } from '../../constants/constants.js';

export const saveFile = async (avatar) => {
  if (!avatar) return undefined;

  let url;
  if (env(CLOUDINARY.ENABLE_CLOUDINARY) === 'true') {
    url = await saveFileToCloudinary(avatar);
  } else {
    url = await saveFileToLocalMachine(avatar);
  }

  return url.secure_url;
};
