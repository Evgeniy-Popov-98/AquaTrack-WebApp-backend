
import mongoose from 'mongoose';
import { env } from '../utils/env.js';
import { ENV_VARS } from '../constants/constants.js';

export const initMongoConnection = async () => {
  const user = env(ENV_VARS.MONGODB_USER);
  const password = env(ENV_VARS.MONGODB_PASSWORD);
  const url = env(ENV_VARS.MONGODB_URL);
  const dbName = env(ENV_VARS.MONGODB_DB);

  const mongoUri = `mongodb+srv://${user}:${password}@${url}/${dbName}?retryWrites=true&w=majority`;

  try {
    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  }
};
