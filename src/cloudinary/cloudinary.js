// import { v2 as cloudinary } from 'cloudinary';
import cloudinary from 'cloudinary';
import dotenv from 'dotenv';
import fs from 'fs/promises';

dotenv.config();

// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadToCloudinary = async (file) => {
  //   const res = await cloudinary.uploader.upload(file.path);
  const res = await cloudinary.v2.uploader.upload(file.path);

  await fs.unlink(file.path);

  return res.secure_url;
};

export default cloudinary;
