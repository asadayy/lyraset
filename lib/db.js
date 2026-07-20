import mongoose from 'mongoose';

/**
 * Cached Mongoose connection.
 *
 * Serverless platforms (Vercel) invoke functions in short-lived containers and
 * Next.js hot-reload re-evaluates modules; both would otherwise open a new
 * connection on every call and exhaust the Atlas connection pool. We stash the
 * connection promise on `global` so it survives across invocations/reloads.
 */

const MONGODB_URI = process.env.MONGODB_URI;

let cached = global._mongoose;
if (!cached) {
  cached = global._mongoose = { conn: null, promise: null };
}

/**
 * Whether a database is configured for this deployment.
 * When false, the data layer falls back to bundled seed content.
 * @returns {boolean}
 */
export function isDbConfigured() {
  return Boolean(MONGODB_URI && MONGODB_URI.trim().length > 0);
}

/**
 * Connect to MongoDB (idempotent). Returns the shared Mongoose connection.
 * Throws if MONGODB_URI is not configured — callers that support a seed
 * fallback should guard with {@link isDbConfigured} first.
 * @returns {Promise<import('mongoose').Mongoose>}
 */
export async function connectToDatabase() {
  if (!isDbConfigured()) {
    throw new Error('MONGODB_URI is not set. Configure it in .env.local.');
  }

  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 8000,
    };
    mongoose.set('strictQuery', true);
    cached.promise = mongoose.connect(MONGODB_URI, opts).then((m) => m);
  }

  try {
    cached.conn = await cached.promise;
  } catch (err) {
    cached.promise = null;
    throw err;
  }
  return cached.conn;
}

export default connectToDatabase;
