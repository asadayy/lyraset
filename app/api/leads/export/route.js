import Lead from '@/models/Lead';
import { isDbConfigured, connectToDatabase } from '@/lib/db';
import { guardAdmin } from '@/lib/apiHelpers';

export const dynamic = 'force-dynamic';

function csvCell(v) {
  const s = String(v ?? '').replace(/"/g, '""');
  return `"${s}"`;
}

/** Admin: export all leads as CSV. */
export async function GET() {
  const denied = await guardAdmin();
  if (denied) return denied;
  if (!isDbConfigured()) return new Response('Database not configured', { status: 503 });
  await connectToDatabase();
  const items = await Lead.find({}).sort({ createdAt: -1 }).lean();

  const header = ['Date', 'Name', 'Email', 'Source', 'Service', 'Status', 'Message'];
  const rows = items.map((l) =>
    [
      new Date(l.createdAt).toISOString(),
      l.name,
      l.email,
      l.source,
      l.serviceSlug || '',
      l.status,
      l.message || '',
    ]
      .map(csvCell)
      .join(',')
  );
  const csv = [header.map(csvCell).join(','), ...rows].join('\r\n');

  return new Response(csv, {
    headers: {
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition': `attachment; filename="lyraset-leads-${Date.now()}.csv"`,
    },
  });
}
