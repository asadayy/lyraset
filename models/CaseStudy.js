import mongoose from 'mongoose';
import { MediaSchema, SeoSchema, model } from './shared.js';

const { Schema } = mongoose;

const MetricSchema = new Schema(
  {
    label: { type: String, default: '' },
    value: { type: String, default: '' },
  },
  { _id: false }
);

const CaseStudySchema = new Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true, index: true },
    categorySlug: { type: String, default: '' },
    categoryName: { type: String, default: '' },
    client: { type: String, default: '' },
    summary: { type: String, default: '' },
    coverImage: { type: MediaSchema, default: () => ({}) },
    gallery: { type: [MediaSchema], default: [] },
    challenge: { type: String, default: '' },
    approach: { type: String, default: '' },
    results: { type: String, default: '' },
    metrics: { type: [MetricSchema], default: [] },
    order: { type: Number, default: 0 },
    featured: { type: Boolean, default: false },
    published: { type: Boolean, default: true },
    seo: { type: SeoSchema, default: () => ({}) },
  },
  { timestamps: true }
);

CaseStudySchema.index({ order: 1 });

export default model('CaseStudy', CaseStudySchema);
