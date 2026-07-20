import mongoose from 'mongoose';
import { MediaSchema, model } from './shared.js';

const { Schema } = mongoose;

const OfficeSchema = new Schema(
  {
    label: { type: String, default: '' },
    address: { type: String, default: '' },
    lat: { type: Number, default: null },
    lng: { type: Number, default: null },
  },
  { _id: false }
);

const SocialSchema = new Schema(
  { platform: { type: String, default: '' }, url: { type: String, default: '' } },
  { _id: false }
);

const StatSchema = new Schema(
  {
    value: { type: String, default: '' }, // display string, e.g. "$12M+"
    number: { type: Number, default: 0 }, // numeric target for counter
    prefix: { type: String, default: '' },
    suffix: { type: String, default: '' },
    label: { type: String, default: '' },
  },
  { _id: false }
);

const AnnouncementSchema = new Schema(
  {
    active: { type: Boolean, default: false },
    heading: { type: String, default: '' },
    text: { type: String, default: '' },
    image: { type: MediaSchema, default: () => ({}) },
    ctaLabel: { type: String, default: '' },
    ctaHref: { type: String, default: '' },
  },
  { _id: false }
);

const SiteSettingsSchema = new Schema(
  {
    key: { type: String, default: 'singleton', unique: true },
    brandName: { type: String, default: 'LYRASET' },
    logoLight: { type: MediaSchema, default: () => ({}) },
    logoDark: { type: MediaSchema, default: () => ({}) },
    tagline: { type: String, default: '' },
    phones: { type: [String], default: [] },
    emails: { type: [String], default: [] },
    whatsapp: { type: String, default: '' },
    whatsappTemplate: { type: String, default: "Hi LYRASET, I'd like to talk about my brand." },
    platforms: { type: [String], default: [] }, // ticker items
    offices: { type: [OfficeSchema], default: [] },
    socials: { type: [SocialSchema], default: [] },
    stats: { type: [StatSchema], default: [] },
    announcement: { type: AnnouncementSchema, default: () => ({}) },
    footerTagline: { type: String, default: '' },
    footerCredit: { type: String, default: 'Powered by KSR Group' },
    ga4Id: { type: String, default: '' },
    metaPixelId: { type: String, default: '' },
  },
  { timestamps: true }
);

export default model('SiteSettings', SiteSettingsSchema);
