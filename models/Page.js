import mongoose from 'mongoose';
import { SeoSchema, model } from './shared.js';

const { Schema } = mongoose;

/**
 * A Page is an ordered list of section records. Each section has a `type`
 * (hero, statsBar, servicesGrid, processTimeline, testimonialSlider,
 * missionColumns, valuesBand, workWithUsForm, richText, mediaBand…) and a
 * flexible `data` payload the admin edits field-by-field. This is what makes
 * "everything editable" possible without code changes.
 */
const SectionSchema = new Schema(
  {
    type: { type: String, required: true },
    label: { type: String, default: '' },
    visible: { type: Boolean, default: true },
    order: { type: Number, default: 0 },
    data: { type: Schema.Types.Mixed, default: {} },
  },
  { _id: true }
);

const PageSchema = new Schema(
  {
    slug: { type: String, required: true, unique: true, index: true },
    title: { type: String, default: '' },
    sections: { type: [SectionSchema], default: [] },
    published: { type: Boolean, default: true },
    seo: { type: SeoSchema, default: () => ({}) },
  },
  { timestamps: true }
);

export default model('Page', PageSchema);
