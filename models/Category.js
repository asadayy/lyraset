import mongoose from 'mongoose';
import { model } from './shared.js';

const { Schema } = mongoose;

const CategorySchema = new Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true, index: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default model('Category', CategorySchema);
