import mongoose from 'mongoose';
import { MediaSchema, model } from './shared.js';

const { Schema } = mongoose;

const TestimonialSchema = new Schema(
  {
    author: { type: String, required: true },
    role: { type: String, default: '' },
    quote: { type: String, required: true },
    headline: { type: String, default: '' },
    avatar: { type: MediaSchema, default: () => ({}) },
    rating: { type: Number, min: 0, max: 5, default: 5 },
    video: { type: MediaSchema, default: () => ({}) },
    order: { type: Number, default: 0 },
    visible: { type: Boolean, default: true },
  },
  { timestamps: true }
);

TestimonialSchema.index({ order: 1 });

export default model('Testimonial', TestimonialSchema);
