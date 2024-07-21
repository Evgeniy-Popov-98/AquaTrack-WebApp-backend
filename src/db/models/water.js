import { Schema, model } from 'mongoose';

const waterSchema = new Schema(
  {
    amountOfWater: { type: Number, required: true }, // Кількість води в мл або літрах
    date: { type: String, required: true },          // Дата споживання води
    month: { type: String },                         // Місяць споживання води
    userId: {                                        // ID користувача, який спожив воду
      type: Schema.Types.ObjectId,
      required: true,
    },
    consumption: { type: Number },                   // Спожита кількість води в цей день
  },
  {
    timestamps: true,                                // Додає поля createdAt і updatedAt
    versionKey: false,                               // Вимикає поле __v для версій
  },
);

// Створюємо модель 'WaterCollection' на основі схеми 'waterSchema'
export const WaterCollection = model('WaterCollection', waterSchema);
