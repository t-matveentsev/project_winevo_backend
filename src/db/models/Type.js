import { model, Schema } from 'mongoose';

const typeSchema = new Schema(
  {
    type: { type: String, required: true, unique: true },
  },
  { timestamps: false, versionKey: false },
);

export const TypeCollection = model('type', typeSchema);
