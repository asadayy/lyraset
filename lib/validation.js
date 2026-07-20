import { z } from 'zod';

/**
 * Zod schemas — the single source of truth for input validation on public
 * form submissions and admin mutations. Never trust client input; every API
 * route parses through one of these before touching the database.
 */

const email = z.string().trim().email('A valid email is required').max(200);
const shortText = z.string().trim().min(1).max(200);
const message = z.string().trim().min(1, 'Message is required').max(4000);

// Honeypot: a hidden field bots tend to fill. Must be empty.
const honeypot = z.string().max(0).optional().or(z.literal(''));

/** Public lead / brief / per-service form submission. */
export const leadSchema = z.object({
  name: shortText,
  email,
  message: message.optional().or(z.literal('')),
  firstName: z.string().trim().max(120).optional(),
  lastName: z.string().trim().max(120).optional(),
  source: z.string().trim().max(120).default('contact'),
  serviceSlug: z.string().trim().max(160).optional(),
  formTitle: z.string().trim().max(160).optional(),
  company: honeypot, // honeypot field
});

/** Public job application submission. */
export const applicationSchema = z.object({
  name: shortText,
  email,
  role: z.string().trim().min(1, 'Please choose a role').max(200),
  jobSlug: z.string().trim().max(200).optional(),
  portfolioUrl: z.string().trim().url('Enter a valid URL').max(400).optional().or(z.literal('')),
  pitch: z.string().trim().min(1, 'Tell us a little about you').max(4000),
  cv: z
    .object({
      url: z.string().url(),
      publicId: z.string(),
      format: z.string().optional(),
      bytes: z.number().optional(),
    })
    .optional(),
  company: honeypot, // honeypot field
});

/** A Cloudinary media reference stored on content documents. */
export const mediaRefSchema = z.object({
  publicId: z.string().min(1),
  url: z.string().url(),
  resourceType: z.enum(['image', 'video', 'raw']).default('image'),
  width: z.number().optional(),
  height: z.number().optional(),
  format: z.string().optional(),
  alt: z.string().max(300).optional().default(''),
});

/**
 * Parse + normalize, returning { success, data } | { success, errors }.
 * @param {import('zod').ZodTypeAny} schema
 * @param {unknown} input
 */
export function safeValidate(schema, input) {
  const result = schema.safeParse(input);
  if (result.success) return { success: true, data: result.data };
  const errors = {};
  for (const issue of result.error.issues) {
    const key = issue.path.join('.') || 'form';
    if (!errors[key]) errors[key] = issue.message;
  }
  return { success: false, errors };
}
