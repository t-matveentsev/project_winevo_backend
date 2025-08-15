import { model, Schema } from 'mongoose';
import { handleSaveError, setUpdateSettings } from './hooks.js';

const wineSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    winery: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    region: {
      type: String,
      required: true,
    },
    strain: {
      type: String,
      required: true,
    },
    year: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
    thumb: {
      type: String,
      // required: true,
    },
  },
  { versionKey: false, timestamps: true },
);

wineSchema.post('save', handleSaveError);

wineSchema.pre('findOneAndUpdate', setUpdateSettings);

wineSchema.post('findOneAndUpdate', handleSaveError);

export const wineSortFields = ['title', 'winery', 'country', 'strain'];

const WineCollection = model('wine', wineSchema);

export default WineCollection;
