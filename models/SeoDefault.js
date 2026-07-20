import mongoose from 'mongoose';
import { MediaSchema, model } from './shared.js';

const { Schema } = mongoose;

const SeoDefaultSchema = new Schema(
  {
    key: { type: String, default: 'singleton', unique: true },
    defaultTitle: { type: String, default: 'LYRASET — International Marketing Agency' },
    titleTemplate: { type: String, default: '%s · LYRASET' },
    defaultDescription: { type: String, default: '' },
    defaultOgImage: { type: MediaSchema, default: () => ({}) },
    twitterHandle: { type: String, default: '' },
    organization: {
      name: { type: String, default: 'LYRASET' },
      legalName: { type: String, default: 'LYRASET International Marketing Agency' },
      url: { type: String, default: '' },
      logo: { type: String, default: '' },
      sameAs: { type: [String], default: [] },
      foundingDate: { type: String, default: '2022' },
    },
  },
  { timestamps: true }
);

export default model('SeoDefault', SeoDefaultSchema);
