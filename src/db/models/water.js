import { Schema, model } from 'mongoose';

const waterSchema = new Schema(
  {
    amountOfWater: { type: Number, required: true },
    date: { type: String },
    month: { type: String },
    consumption: { type: Number },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const WaterCollection = model('water', waterSchema);
