import { saveFileToLocalMachine } from '../saveFileToUploadDir.js';
import { uploadToCloudinary } from './cloudinary.js';
import { env } from '../env.js';

export const saveFile = async (avatar) => {
  if (!avatar) return undefined;

  let url;
  if (env.CLOUDINARY_ENABLED === 'true') {
    url = await uploadToCloudinary(avatar);
  } else {
    url = await saveFileToLocalMachine(avatar);
  }

  return url;
};
