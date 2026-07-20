import Job from '@/models/Job';
import { collectionHandlers } from '@/lib/crud';

export const dynamic = 'force-dynamic';

const h = collectionHandlers({ Model: Job, tags: ['jobs'], hasSlug: true });
export const GET = h.GET;
export const POST = h.POST;
