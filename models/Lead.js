import mongoose from 'mongoose';
import { model } from './shared.js';

const { Schema } = mongoose;

const LeadSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    firstName: { type: String, default: '' },
    lastName: { type: String, default: '' },
    message: { type: String, default: '' },
    source: { type: String, default: 'contact' }, // contact | brief | work-with-us | service:<slug>
    serviceSlug: { type: String, default: '' },
    formTitle: { type: String, default: '' },
    status: {
      type: String,
      enum: ['new', 'contacted', 'won', 'archived'],
      default: 'new',
    },
    notes: { type: String, default: '' },
    meta: {
      ip: String,
      userAgent: String,
      page: String,
    },
  },
  { timestamps: true }
);

LeadSchema.index({ createdAt: -1 });

export default model('Lead', LeadSchema);
