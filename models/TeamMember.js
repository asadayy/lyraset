import mongoose from 'mongoose';
import { MediaSchema, model } from './shared.js';

const { Schema } = mongoose;

const SocialSchema = new Schema(
  {
    platform: { type: String, default: '' },
    url: { type: String, default: '' },
  },
  { _id: false }
);

const TeamMemberSchema = new Schema(
  {
    name: { type: String, required: true },
    role: { type: String, default: '' },
    type: { type: String, enum: ['individual', 'group'], default: 'individual' },
    photo: { type: MediaSchema, default: () => ({}) },
    bio: { type: String, default: '' },
    skills: { type: [String], default: [] },
    socials: { type: [SocialSchema], default: [] },
    order: { type: Number, default: 0 },
    visible: { type: Boolean, default: true },
  },
  { timestamps: true }
);

TeamMemberSchema.index({ order: 1 });

export default model('TeamMember', TeamMemberSchema);
