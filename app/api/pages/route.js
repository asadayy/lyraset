import Page from '@/models/Page';
import { collectionHandlers } from '@/lib/crud';

export const dynamic = 'force-dynamic';

const h = collectionHandlers({ Model: Page, tags: ['pages'], hasSlug: true });
export const GET = h.GET;
export const POST = h.POST;
