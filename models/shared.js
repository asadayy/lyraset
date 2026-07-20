import mongoose from 'mongoose';

const { Schema } = mongoose;

/**
 * Reusable embedded schema for a Cloudinary media reference. Used everywhere a
 * document points at an image/video/PDF. `alt` is required in the CMS for
 * accessibility (enforced at the form layer).
 */
export const MediaSchema = new Schema(
  {
    publicId: { type: String, default: '' },
    url: { type: String, default: '' },
    resourceType: { type: String, enum: ['image', 'video', 'raw'], default: 'image' },
    width: Number,
    height: Number,
    format: String,
    alt: { type: String, default: '' },
  },
  { _id: false }
);

/** Reusable embedded SEO block for per-entity overrides. */
export const SeoSchema = new Schema(
  {
    title: { type: String, default: '' },
    description: { type: String, default: '' },
    ogImage: { type: MediaSchema, default: () => ({}) },
    canonical: { type: String, default: '' },
    noindex: { type: Boolean, default: false },
  },
  { _id: false }
);

/** A CTA button (label + href). */
export const CtaSchema = new Schema(
  {
    label: { type: String, default: '' },
    href: { type: String, default: '' },
    style: { type: String, enum: ['primary', 'ghost', 'ghost-dark'], default: 'primary' },
  },
  { _id: false }
);

/** Prevent OverwriteModelError across hot-reloads / serverless invocations. */
export function model(name, schema) {
  return mongoose.models[name] || mongoose.model(name, schema);
}
