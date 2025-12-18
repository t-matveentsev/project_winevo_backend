import { model, Schema } from 'mongoose';
import { handleSaveError, setUpdateSettings } from './hooks.js';

const wineSchema = new Schema(
  {
    type: {
      type: Schema.Types.ObjectId,
      ref: 'type',
      required: true,
    },
    title: {
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
    winery: {
      type: String,
      required: true,
    },
    varietal: [
      {
        type: Schema.Types.ObjectId,
        ref: 'varietal',
        required: true,
      },
    ],
    year: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    thumb: {
      type: String,
      required: false,
      default: 'none',
    },
  },
  { versionKey: false, timestamps: true },
);

wineSchema.post('save', handleSaveError);

wineSchema.pre('findOneAndUpdate', setUpdateSettings);

wineSchema.post('findOneAndUpdate', handleSaveError);

export const wineSortFields = [
  'winery',
  'country',
  'varietal',
  'type',
  'title',
];

const WineCollection = model('wine', wineSchema);

export default WineCollection;
