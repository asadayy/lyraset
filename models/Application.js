import mongoose from 'mongoose';
import { MediaSchema, model } from './shared.js';

const { Schema } = mongoose;

const ApplicationSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    role: { type: String, default: '' },
    jobSlug: { type: String, default: '' },
    portfolioUrl: { type: String, default: '' },
    pitch: { type: String, default: '' },
    cv: { type: MediaSchema, default: () => ({}) },
    status: {
      type: String,
      enum: ['new', 'reviewed', 'shortlisted', 'rejected'],
      default: 'new',
    },
    notes: { type: String, default: '' },
    meta: {
      ip: String,
      userAgent: String,
    },
  },
  { timestamps: true }
);

ApplicationSchema.index({ createdAt: -1 });

export default model('Application', ApplicationSchema);
