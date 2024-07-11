import { isHttpError } from 'http-errors';
import mongoose from 'mongoose';

export const errorHandler = (error, req, res, next) => {
  if (isHttpError(error)) {
    return res.status(error.status).json({
      status: error.status,
      message: error.message,
    });
  }

  if (error instanceof mongoose.Error) {
    return res.status(500).json({
      status: 500,
      message: 'Mongoose error',
      data: {
        message: error.message,
      },
    });
  }

  console.error(error); 
  res.status(500).json({
    message: 'Something went wrong',
    error: error.message,
  });
};
