import mongoose from 'mongoose';
import { model } from './shared.js';

const { Schema } = mongoose;

const AdminUserSchema = new Schema(
  {
    email: { type: String, required: true, unique: true, lowercase: true, index: true },
    name: { type: String, default: 'Admin' },
    passwordHash: { type: String, required: true },
    role: { type: String, default: 'admin' },
  },
  { timestamps: true }
);

export default model('AdminUser', AdminUserSchema);
