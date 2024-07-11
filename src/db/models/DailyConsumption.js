
import mongoose from 'mongoose';

const dailySchema = new mongoose.Schema({
  date: { type: String, required: true },
  consumption: { type: Number, required: true }
});

const DailyConsumption = mongoose.model('DailyConsumption', dailySchema);

export default DailyConsumption;
