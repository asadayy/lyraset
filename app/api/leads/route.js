import Lead from '@/models/Lead';
import { isDbConfigured, connectToDatabase } from '@/lib/db';
import { guardAdmin, json, ok, fail, readJson, clientIp } from '@/lib/apiHelpers';
import { plain } from '@/lib/utils';
import { leadSchema, safeValidate } from '@/lib/validation';
import { rateLimit } from '@/lib/rateLimit';
import { notifyNewSubmission } from '@/lib/notify';

export const dynamic = 'force-dynamic';

/** Admin: list all leads (newest first). */
export async function GET() {
  const denied = await guardAdmin();
  if (denied) return denied;
  if (!isDbConfigured()) return json({ ok: true, items: [] });
  await connectToDatabase();
  const items = await Lead.find({}).sort({ createdAt: -1 }).lean();
  return json({ ok: true, items: items.map(plain) });
}

/** Public: submit a lead / brief / per-service form. */
export async function POST(req) {
  const ip = clientIp(req);
  const { allowed } = rateLimit(`lead:${ip}`, 5, 60_000);
  if (!allowed) return fail('Too many requests. Please try again shortly.', 429);

  const body = (await readJson(req)) || {};
  const { success, data, errors } = safeValidate(leadSchema, body);
  if (!success) return fail('Validation failed', 422, { errors });

  // Honeypot: `company` must be empty (bots fill it).
  if (data.company) return ok({ item: null }); // silently accept, drop

  if (!isDbConfigured()) {
    // No DB: accept so the UX still succeeds in demo mode, but nothing persists.
    return ok({ item: null, demo: true });
  }

  await connectToDatabase();
  const doc = await Lead.create({
    name: data.name,
    email: data.email,
    firstName: data.firstName || '',
    lastName: data.lastName || '',
    message: data.message || '',
    source: data.source || 'contact',
    serviceSlug: data.serviceSlug || '',
    formTitle: data.formTitle || '',
    meta: { ip, userAgent: req.headers.get('user-agent') || '', page: data.source || '' },
  });

  notifyNewSubmission({
    subject: `New lead: ${data.name}`,
    lines: [
      { label: 'Name', value: data.name },
      { label: 'Email', value: data.email },
      { label: 'Source', value: data.source || 'contact' },
      { label: 'Message', value: data.message || '—' },
    ],
  }).catch(() => {});

  return ok({ item: plain(doc) });
}
