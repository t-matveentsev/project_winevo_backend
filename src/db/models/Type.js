import { model, Schema } from 'mongoose';

const typeSchema = new Schema(
  {
    name: { type: String, required: true, unique: true },
  },
  { timestamps: false, versionKey: false },
);

export const TypeCollection = model('type', typeSchema);
