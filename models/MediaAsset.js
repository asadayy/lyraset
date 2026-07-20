import mongoose from 'mongoose';
import { model } from './shared.js';

const { Schema } = mongoose;

const UsageSchema = new Schema(
  {
    type: String, // service | caseStudy | team | testimonial | page | settings ...
    refId: String,
    label: String,
  },
  { _id: false }
);

const MediaAssetSchema = new Schema(
  {
    publicId: { type: String, required: true, unique: true, index: true },
    url: { type: String, required: true },
    resourceType: { type: String, enum: ['image', 'video', 'raw'], default: 'image' },
    format: String,
    bytes: Number,
    width: Number,
    height: Number,
    alt: { type: String, default: '' },
    folder: { type: String, default: 'lyraset' },
    usedIn: { type: [UsageSchema], default: [] },
  },
  { timestamps: true }
);

MediaAssetSchema.index({ createdAt: -1 });

export default model('MediaAsset', MediaAssetSchema);
