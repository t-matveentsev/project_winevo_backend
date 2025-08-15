import { model, Schema } from 'mongoose';

const varietalSchema = new Schema(
  {
    varietal: { type: String, required: true, unique: true },
  },
  { timestamps: false, versionKey: false },
);

export const VarietalCollection = model('varietal', varietalSchema);
