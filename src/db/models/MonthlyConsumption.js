
import mongoose from 'mongoose';

const monthlySchema = new mongoose.Schema({
  month: { type: String, required: true },
  consumption: { type: Number, required: true }
});

const MonthlyConsumption = mongoose.model('MonthlyConsumption', monthlySchema);

export default MonthlyConsumption;
