import { Schema, model } from 'mongoose';
import { typeList } from '../../constant/constant.js';
import { mongooseSaveError, setUpdateSettings } from './hooks.js';

const contactShema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: false,
    },
    isFavourite: {
      type: Boolean,
      required: false,
    },
    contactType: {
      type: String,
      enum: typeList,
      default: 'personal',
    },

    userId: { type: String, required: true, ref: 'users' },
    photo: { type: String },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);
contactShema.post('save', mongooseSaveError);
contactShema.pre('findOneAndUpdate', setUpdateSettings);
contactShema.post('findOneAndUpdate', mongooseSaveError);

export const ContactCollection = model('contacts', contactShema);

