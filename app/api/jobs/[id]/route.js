import Job from '@/models/Job';
import { itemHandlers } from '@/lib/crud';

export const dynamic = 'force-dynamic';

const h = itemHandlers({ Model: Job, tags: ['jobs'], hasSlug: true });
export const GET = h.GET;
export const PUT = h.PUT;
export const DELETE = h.DELETE;
