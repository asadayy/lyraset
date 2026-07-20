import mongoose from 'mongoose';
import { SeoSchema, model } from './shared.js';

const { Schema } = mongoose;

const JobSchema = new Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true, index: true },
    employmentType: { type: String, default: 'Full-time' },
    location: { type: String, default: '' },
    summary: { type: String, default: '' },
    responsibilities: { type: [String], default: [] },
    requirements: { type: [String], default: [] },
    open: { type: Boolean, default: true },
    order: { type: Number, default: 0 },
    seo: { type: SeoSchema, default: () => ({}) },
  },
  { timestamps: true }
);

JobSchema.index({ order: 1 });

export default model('Job', JobSchema);
