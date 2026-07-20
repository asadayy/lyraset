import Page from '@/models/Page';
import { collectionHandlers } from '@/lib/crud';
import { pages as seed } from '@/lib/seed';

export const dynamic = 'force-dynamic';

const h = collectionHandlers({ Model: Page, tags: ['pages'], hasSlug: true, seed });
export const GET = h.GET;
export const POST = h.POST;
