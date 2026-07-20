import Job from '@/models/Job';
import { collectionHandlers } from '@/lib/crud';
import { jobs as seed } from '@/lib/seed';

export const dynamic = 'force-dynamic';

const h = collectionHandlers({ Model: Job, tags: ['jobs'], hasSlug: true, seed });
export const GET = h.GET;
export const POST = h.POST;
