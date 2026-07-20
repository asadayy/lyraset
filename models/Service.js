import mongoose from 'mongoose';
import { MediaSchema, SeoSchema, CtaSchema, model } from './shared.js';

const { Schema } = mongoose;

const ContentBlockSchema = new Schema(
  {
    heading: String,
    body: String,
    image: { type: MediaSchema, default: () => ({}) },
  },
  { _id: false }
);

const ServiceSchema = new Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true, index: true },
    shortBlurb: { type: String, default: '' },
    iconKey: { type: String, default: 'sparkles' },
    heroHeadline: { type: String, default: '' },
    description: { type: String, default: '' },
    deliverables: { type: [String], default: [] },
    formTitle: { type: String, default: 'Get a Free Consultation' },
    formEnabled: { type: Boolean, default: true },
    heroImage: { type: MediaSchema, default: () => ({}) },
    gallery: { type: [MediaSchema], default: [] },
    extraBlocks: { type: [ContentBlockSchema], default: [] },
    ctas: { type: [CtaSchema], default: [] },
    featured: { type: Boolean, default: false },
    order: { type: Number, default: 0 },
    published: { type: Boolean, default: true },
    seo: { type: SeoSchema, default: () => ({}) },
  },
  { timestamps: true }
);

ServiceSchema.index({ order: 1 });

export default model('Service', ServiceSchema);
