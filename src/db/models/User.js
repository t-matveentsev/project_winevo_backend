import { model, Schema } from 'mongoose';
import { emailRegexp } from '../../constants/auth.js';
import { handleSaveError, setUpdateSettings } from './hooks.js';

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      match: emailRegexp,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: 'user',
    },
    verify: {
      type: Boolean,
      default: false,
      required: true,
    },
    favorites: [{ type: Schema.Types.ObjectId, ref: 'wine', default: [] }],
  },
  { versionKey: false, timestamps: true },
);

userSchema.post('save', handleSaveError);

userSchema.pre('findOneAndUpdate', setUpdateSettings);

userSchema.post('findOneAndUpdate', handleSaveError);

const UserCollection = model('user', userSchema);

export default UserCollection;
