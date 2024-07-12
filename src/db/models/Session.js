import mongoose from 'mongoose';

const sessionSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ['session'],
      required: true,
      default: 'session',
    },

    userId: { type: mongoose.Schema.ObjectId, required: true },
    accessToken: { type: String, required: true },
    refreshToken: { type: String, required: true },
    accessTokenValidUntil: { type: Date, required: true },
    refreshTokenValidUntil: { type: Date, required: true },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

sessionSchema.index({ userId: +1 }, { unique: true });

const Session = mongoose.model('Users', sessionSchema);

export { Session };
