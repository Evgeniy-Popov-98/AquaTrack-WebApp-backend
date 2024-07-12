import { Schema, model } from 'mongoose';

const waterSchema = new Schema(
  {
    amountOfWater: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const WaterCollection = model('water', waterSchema);
